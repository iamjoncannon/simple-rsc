import { build as esbuild } from 'esbuild';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolveClientDist } from './utils.js';

const USE_CLIENT_ANNOTATIONS = ['"use client"', "'use client'"];
const JSX_EXTS = ['.jsx', '.tsx'];
const relativeOrAbsolutePathRegex = /^\.{0,2}\//;

export async function build(srcPath, distPath, appRoot, serverComponents) {
	const resolveSrc = (path) => new URL(path, new URL(srcPath, import.meta.url));
	const resolveDist = (path) => new URL(path, new URL(distPath, import.meta.url));

	const clientComponentMap = {};

	const clientEntryPoints = new Set();

	const serverDist = resolveDist('server/');
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

	const entryPoints = serverComponents.map((each) => fileURLToPath(resolveSrc(`${each}.jsx`)));

	await esbuild({
		...sharedConfig,
		entryPoints,
		outdir: fileURLToPath(serverDist),
		packages: 'external',
		plugins: [
			{
				name: 'resolve-client-imports',
				setup(build) {
					build.onResolve({ filter: relativeOrAbsolutePathRegex }, async ({ path }) => {
						for (const jsxExt of JSX_EXTS) {
							const absoluteSrc = new URL(resolveSrc(path) + jsxExt);

							if (fs.existsSync(absoluteSrc)) {
								const contents = await fs.promises.readFile(absoluteSrc, 'utf-8');
								if (!USE_CLIENT_ANNOTATIONS.some((annotation) => contents.startsWith(annotation)))
									return;

								clientEntryPoints.add(fileURLToPath(absoluteSrc));
								const absoluteDist = new URL(resolveClientDist(path, resolveDist) + '.js');

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
					});
				}
			}
		]
	});

	const clientDist = resolveDist('client/');
	if (!fs.existsSync(clientDist)) {
		await fs.promises.mkdir(clientDist, { recursive: true });
	}

	if (clientEntryPoints.size > 0) {
		console.log('🏝 Building client components');
	}

	await esbuild({
		...sharedConfig,
		entryPoints: [...clientEntryPoints, fileURLToPath(resolveSrc(appRoot))],
		outdir: fileURLToPath(clientDist),
		splitting: true
	});

	global.clientComponentMap = clientComponentMap;
}

function getClientComponentModule(id, localImportPath) {
	return `import DefaultExport from ${JSON.stringify(localImportPath)};
	DefaultExport.$$typeof = Symbol.for("react.client.reference");
	DefaultExport.$$id=${JSON.stringify(id)};
	export default DefaultExport;`;
}
