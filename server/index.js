import fs from 'node:fs';
// @ts-ignore
import { createRouter } from '@hattip/router';
// @ts-ignore
import { createServer } from '@hattip/adapter-node';
import RscService from './RscService.js';
import { PrismaClient } from '@prisma/client';
import hydrators from '../app/serverComponents/hydrators.js';

export const clientRootDirectory = '../app/';
export const distRootDirectory = '../dist/';
export const appRoot = 'appRoot.jsx';
const serverComponentPath = process.cwd() + '/app/serverComponents';

function walk(dir) {
	let results = [];
	const list = fs.readdirSync(dir);
	list.forEach(function (file) {
		file = dir + '/' + file;
		const stat = fs.statSync(file);
		if (stat && stat.isDirectory()) {
			results = results.concat(walk(file));
		} else {
			results.push(file);
		}
	});
	return results;
}

const serverComponents = walk(serverComponentPath).map((each) =>
	each.replace(serverComponentPath, 'serverComponents')
);

// const port = 3000;
// const host = 'localhost';
const port = 80;
const host = '0.0.0.0';

process.env.NODE_ENV = 'production';

const rscService = new RscService(
	clientRootDirectory,
	distRootDirectory,
	appRoot,
	serverComponents,
	hydrators
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

createServer(server.buildHandler()).listen(port, host, async () => {
	await rscService.build();
	console.log(`rsc service started on http://localhost:${port}`);
});
