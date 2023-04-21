// @ts-expect-error Module '"react"' has no exported member 'use'.
import { StrictMode, useEffect, useState, use, startTransition } from 'react';
import { createRoot } from 'react-dom/client';
import { /* FOR FRAMEWORK DEVS */ createFromFetch } from 'react-server-dom-webpack/client';
import ServerOutput from './ServerOutput.jsx';

/** Dev-only dependencies */
import { DevPanel } from './utils/dev/DevPanel.jsx';
import './utils/dev/live-reload.js';

// HACK: map webpack resolution to native ESM
// @ts-expect-error Property '__webpack_require__' does not exist on type 'Window & typeof globalThis'.
window.__webpack_require__ = async (id) => {
	return import(id);
};

// @ts-expect-error
const root = createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<Router />
	</StrictMode>
);

let callbacks = [];
// @ts-expect-error Property 'router' does not exist on type 'Window & typeof globalThis'.
window.router = {
	navigate(/** @type {string} */ url) {
		window.history.replaceState({}, '', url);
		callbacks.forEach((cb) => cb());
	}
};

const Wrapper = ({ children }) => {

	return (
		<div>
			<span>this is a wrapper </span>
			{children}
		</div>
	)
}

function Router() {
	const [url, setUrl] = useState('/rsc' + window.location.search);

	useEffect(() => {
		function handleNavigate() {
			startTransition(() => {
				setUrl('/rsc' + window.location.search);
			});
		}
		callbacks.push(handleNavigate);
		window.addEventListener('popstate', handleNavigate);
		return () => {
			callbacks.splice(callbacks.indexOf(handleNavigate), 1);
			window.removeEventListener('popstate', handleNavigate);
		};
	}, []);

	return (
		<Wrapper>
			<ServerOutput url={url} />
			{/* <DevPanel url={url} /> */}
		</Wrapper>
	);
}


