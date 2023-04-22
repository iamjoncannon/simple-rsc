import fs from 'node:fs';
import { createRouter } from '@hattip/router';
import { createServer } from '@hattip/adapter-node';
import RscService from './RscService.js';

export const clientRootDirectory = '../app/';
export const distRootDirectory = '../dist/';
export const appRoot = '_router.jsx';
export const serverComponents = ['ComponentA', 'ComponentB'];

const port = 3000;

process.env.NODE_ENV = 'development';

const rscService = new RscService(
	clientRootDirectory,
	distRootDirectory,
	appRoot,
	serverComponents
);

rscService.buildWatch();

const server = createRouter();

server.post('/rsc', async ({ request }) => {
	const props = await request.json();
	return rscService.stream(props);
});

server.get('/', async () => {
	const html = await fs.promises.readFile(
		new URL('./templates/index.html', import.meta.url),
		'utf-8'
	);
	return new Response(html, {
		headers: { 'Content-type': 'text/html' }
	});
});

server.get('/dist/client/**/*.js', async ({ request }) => {
	const { pathname } = new URL(request.url);
	return rscService.serveClientComponent(pathname);
});

createServer(server.buildHandler()).listen(port, 'localhost', async () => {
	await rscService.build();
	console.log(`⚛️ Future of React started on http://localhost:${port}`);
});
