import fs from 'node:fs';
import { createElement } from 'react';
import { createRouter } from '@hattip/router';
import * as ReactServerDom from 'react-server-dom-webpack/server.browser';
import { resolveClientDist, resolveServerDist } from './utils.js';

const server = createRouter();

server.post('/rsc', async ({ request }) => {
	const props = await request.json();

	// stream(props)

	const PageModule = await import(
		resolveServerDist(
			`${props.tag}.js${process.env.NODE_ENV === 'development' ? `?invalidate=${Date.now()}` : ''}`
		).href
	);

	const Page = createElement(PageModule.default, props);

	const stream = ReactServerDom.renderToReadableStream(Page, global.clientComponentMap);

	return new Response(stream, {
		headers: { 'Content-type': 'text/x-component' }
	});
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
	const filePath = pathname.replace('/dist/client/', '');
	const contents = await fs.promises.readFile(resolveClientDist(filePath), 'utf-8');
	return new Response(contents, {
		headers: {
			'Content-Type': 'application/javascript'
		}
	});
});

export const handler = server.buildHandler();
