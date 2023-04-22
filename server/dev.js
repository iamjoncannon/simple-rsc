import { createServer } from '@hattip/adapter-node';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'node:url';
import { relative } from 'node:path';
import chokidar from 'chokidar';
import { handler } from './index.js';
import { build } from './build.js';

export const clientRootDirectory = '../app/';
export const distRootDirectory = '../dist/';
export const appRoot = '_router.jsx';
export const serverComponents = ['ComponentA', 'ComponentB'];

const port = 3000;

process.env.NODE_ENV = 'development';

createServer(handler).listen(port, 'localhost', async () => {
	await build(clientRootDirectory, distRootDirectory, appRoot, serverComponents);
	console.log(`⚛️ Future of React started on http://localhost:${port}`);
});

// File watcher to trigger browser refreshes
// ------------

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

(async function buildWatch() {
	const clientRootPath = new URL(clientRootDirectory, import.meta.url);
	chokidar
		.watch(fileURLToPath(clientRootPath), { ignoreInitial: true })
		.on('all', async (event, path) => {
			console.log('[change]', relative(fileURLToPath(clientRootPath), path));
			await build();

			for (const socket of sockets) {
				socket.send('refresh');
			}
		});
})();
