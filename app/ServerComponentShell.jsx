// @ts-expect-error Module '"react"' has no exported member 'use'.
import { useState, use, Suspense, useMemo } from 'react';
import { /* FOR FRAMEWORK DEVS */ createFromFetch } from 'react-server-dom-webpack/client';

const initialCacheJsx = new Map();
const initialCacheRemoteState = new Map();

const ServerComponentShell = ({ children, onHydrate }) => {
	const componentName = children.type.componentName;
	const childProps = children.props;
	// define hydrator as prop or fallback
	const hydrator = childProps.hydrator || children.type.hydrator;

	const propsForServer = JSON.stringify({ hydrator, componentName, ...childProps });

	const init = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: propsForServer
	};

	const url = '/rsc';
	const [jsxCache] = useState(initialCacheJsx);
	const [stateCache] = useState(initialCacheRemoteState);

	const lazyJsx = useMemo(() => {
		if (!jsxCache.has(propsForServer)) {
			const apiCall = fetch(url, init);

			apiCall.then((data) => {
				let stateFromHydration = '';
				try {
					stateFromHydration = JSON.parse(
						decodeURIComponent(data.headers.get('stateFromHydration') || '')
					);
				} catch (err) {}
				stateCache.set(propsForServer, stateFromHydration);
			});

			const created = createFromFetch(apiCall);

			jsxCache.set(propsForServer, created);
		}

		const jsxCacheHit = jsxCache.get(propsForServer);
		const stateCacheHit = stateCache.get(propsForServer);

		!!onHydrate && onHydrate(stateCacheHit);

		return use(jsxCacheHit);
	}, [propsForServer]);

	return lazyJsx;
};

export default ServerComponentShell;
