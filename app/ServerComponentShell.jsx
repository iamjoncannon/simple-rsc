// @ts-expect-error Module '"react"' has no exported member 'use'.
import { useState, use, Suspense, useMemo } from 'react';
import { /* FOR FRAMEWORK DEVS */ createFromFetch } from 'react-server-dom-webpack/client';

const initialCache = new Map();

function ServerComponentShell(props) {
	const componentName = props.children.type.componentName;
	const childProps = props.children.props;
	// define hydrator as prop or fallback
	const hydrator = childProps.hydrator || props.children.type.hydrator;

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
	const [cache] = useState(initialCache);

	const lazyJsx = useMemo(() => {
		if (!cache.has(propsForServer)) {
			cache.set(propsForServer, createFromFetch(fetch(url, init)));
		}

		return cache.get(propsForServer);
	}, [propsForServer]);

	return <>{!lazyJsx.isPending ? use(lazyJsx) : <span>loading</span>}</>;
}

export default ServerComponentShell;
