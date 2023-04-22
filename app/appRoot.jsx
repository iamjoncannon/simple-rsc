// @ts-nocheck
// @ts-expect-error Module '"react"' has no exported member 'use'.
import { StrictMode, useEffect, useState, use, startTransition } from 'react';
import { createRoot } from 'react-dom/client';
import { /* FOR FRAMEWORK DEVS */ createFromFetch } from 'react-server-dom-webpack/client';
import ComponentA from './serverComponents/ComponentA.jsx';
import ComponentB from './serverComponents/ComponentB.jsx';
import Shell from './Shell.jsx';
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
		<AppRoot />
	</StrictMode>
);

function AppRoot() {
	return (<>
			<Shell><ComponentA input={"some input"} /></Shell>
			<Shell><ComponentB/></Shell>
	</>
	);
}


