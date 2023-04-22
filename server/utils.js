import fs from 'node:fs';

export const dist = new URL('../dist/', import.meta.url);

export function resolveClientDist(path, resolveDist) {
	return new URL(path, resolveDist('client/'));
}

export function resolveServerDist(path, resolveDist) {
	return new URL(path, resolveDist('server/'));
}
