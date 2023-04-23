// @ts-nocheck
import { build as esbuild } from 'esbuild';
import fs from 'node:fs';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'node:url';
import { relative } from 'node:path';
import chokidar from 'chokidar';
import { createElement } from 'react';
import * as ReactServerDom from 'react-server-dom-webpack/server.browser';
import hydratorMap from './hydratorConstants.js';
import hydrators from './hydrators.js';

const USE_CLIENT_ANNOTATIONS = ['"use client"', "'use client'"];
const JSX_EXTS = ['.jsx', '.tsx'];
const relativeOrAbsolutePathRegex = /^\.{0,2}\//;

export default class RscService {
	constructor(srcPath, distPath, appRoot, serverComponents, hydrators) {
		this.srcPath = srcPath;
		this.distPath = distPath;
		this.appRoot = appRoot;
		this.serverComponents = serverComponents;
		this.clientComponentMap = {};
		this.hydrators = hydrators;
	}

	resolveSrc(path) {
		return new URL(path, new URL(this.srcPath, import.meta.url));
	}

	resolveDist(path) {
		return new URL(path, new URL(this.distPath, import.meta.url));
	}

	resolveServerDist(path) {
		return new URL(path, this.resolveDist('server/'));
	}

	resolveClientDist(path) {
		return new URL(path, this.resolveDist('client/'));
	}

	async build() {
		const clientComponentMap = {};

		const clientEntryPoints = new Set();

		const serverDist = this.resolveDist('server/');
		if (!fs.existsSync(serverDist)) {
			await fs.promises.mkdir(serverDist, { recursive: true });
		}

		/** @type {import('esbuild').BuildOptions} */
		const sharedConfig = {
			bundle: true,
			format: 'esm',
			logLevel: 'error',
			minify: true
		};

		const entryPoints = this.serverComponents.map((each) =>
			fileURLToPath(this.resolveSrc(`${each}`))
		);

		async function onResolveCb({ path }) {
			for (const jsxExt of JSX_EXTS) {
				const absoluteSrc = new URL(this.resolveSrc(path) + jsxExt);

				if (fs.existsSync(absoluteSrc)) {
					const contents = await fs.promises.readFile(absoluteSrc, 'utf-8');
					if (!USE_CLIENT_ANNOTATIONS.some((annotation) => contents.startsWith(annotation))) return;

					clientEntryPoints.add(fileURLToPath(absoluteSrc));
					const absoluteDist = new URL(this.resolveClientDist(path) + '.js');

					const id = `/dist/client/${path}.js`;

					clientComponentMap[id] = {
						id,
						chunks: [],
						name: 'default', // TODO support named exports
						async: true
					};

					return {
						path: `data:text/javascript,${encodeURIComponent(
							getClientComponentModule(id, absoluteDist.href)
						)}`,
						external: true
					};
				}
			}
		}

		const boundOnResolveCb = onResolveCb.bind(this);

		await esbuild({
			...sharedConfig,
			entryPoints,
			outdir: fileURLToPath(serverDist),
			packages: 'external',
			plugins: [
				{
					name: 'resolve-client-imports',
					setup(build) {
						build.onResolve({ filter: relativeOrAbsolutePathRegex }, boundOnResolveCb);
					}
				}
			]
		});

		const clientDist = this.resolveDist('client/');
		if (!fs.existsSync(clientDist)) {
			await fs.promises.mkdir(clientDist, { recursive: true });
		}

		if (clientEntryPoints.size > 0) {
			console.log('🏝 Building client components');
		}

		await esbuild({
			...sharedConfig,
			entryPoints: [...clientEntryPoints, fileURLToPath(this.resolveSrc(this.appRoot))],
			outdir: fileURLToPath(clientDist),
			splitting: true
		});

		this.clientComponentMap = clientComponentMap;
	}

	async buildWatch() {
		const refreshPort = 21717;

		const wsServer = new WebSocketServer({
			port: refreshPort
		});

		/** @type {Set<import('ws').WebSocket>} */
		const sockets = new Set();

		wsServer.on('connection', (ws) => {
			sockets.add(ws);

			ws.on('close', () => {
				sockets.delete(ws);
			});

			ws.send('connected');
		});

		const clientRootPath = new URL(this.srcPath, import.meta.url);
		chokidar
			.watch(fileURLToPath(clientRootPath), { ignoreInitial: true })
			.on('all', async (event, path) => {
				console.log('[change]', relative(fileURLToPath(clientRootPath), path));
				await this.build();

				for (const socket of sockets) {
					socket.send('refresh');
				}
			});
	}

	async stream(propsFromShell) {
		// resolve hydrator for component

		if (!propsFromShell.componentName || !propsFromShell.hydrator) {
			return new Response('server error- failed to hydrate server component', {
				headers: { 'Content-type': 'text/x-component' }
			});
		}

		const hydrator = propsFromShell.hydrator;
		const componentName = propsFromShell.componentName;

		// process props- take view layer props and resolve data for hydration

		const { hydratorProps, stateFromHydration } = await hydrators[hydrator](propsFromShell);

		const PageModule = await import(
			this.resolveServerDist(
				`${componentName}.js${
					process.env.NODE_ENV === 'development' ? `?invalidate=${Date.now()}` : ''
				}`
			).href
		);

		const jsx = createElement(PageModule.default, hydratorProps);

		const stream = ReactServerDom.renderToReadableStream(jsx, global.clientComponentMap);

		return new Response(stream, {
			headers: new Headers({
				stateFromHydration: encodeURIComponent(JSON.stringify(stateFromHydration))
			})
		});
	}

	async serveClientComponent(pathname) {
		const filePath = pathname.replace('/dist/client/', '');
		const contents = await fs.promises.readFile(this.resolveClientDist(filePath), 'utf-8');
		return new Response(contents, {
			headers: {
				'Content-Type': 'application/javascript'
			}
		});
	}
}

function getClientComponentModule(id, localImportPath) {
	return `import DefaultExport from ${JSON.stringify(localImportPath)};
	DefaultExport.$$typeof = Symbol.for("react.client.reference");
	DefaultExport.$$id=${JSON.stringify(id)};
	export default DefaultExport;`;
}
