// @ts-expect-error Module '"react"' has no exported member 'use'.
import { useState, use } from 'react';
import { /* FOR FRAMEWORK DEVS */ createFromFetch } from 'react-server-dom-webpack/client';


const initialCache = new Map();

function Shell(props) {

	const tag = props.children.type.tag
	const childProps = props.children.props

	const propsForServer = JSON.stringify({ tag, ...childProps })

	const init = {
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		  },
		body: propsForServer
	}

	const url = "/rsc"
	const [cache, setCache] = useState(initialCache);
	if (!cache.has(propsForServer)) {
		cache.set(propsForServer, createFromFetch(fetch(url, init)));
	}
	const lazyJsx = cache.get(propsForServer);
	return use(lazyJsx);
}


export default Shell