// @ts-expect-error Module '"react"' has no exported member 'use'.
import { StrictMode, useEffect, useState, use, startTransition } from 'react';
import { /* FOR FRAMEWORK DEVS */ createFromFetch } from 'react-server-dom-webpack/client';
    

const initialCache = new Map();

function ServerOutput({ url }) {
	const [cache, setCache] = useState(initialCache);
	if (!cache.has(url)) {
		cache.set(url, createFromFetch(fetch(url)));
	}
	const lazyJsx = cache.get(url);
	return use(lazyJsx);
}

export default ServerOutput