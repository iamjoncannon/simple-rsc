import { Suspense } from 'react';
import { getAll } from './db/get.js';
import SearchableAlbumList from './SearchableAlbumList';


// search is search params from client

export default async function ServerRoot({ search }) {
	return (
		<>
			<h1>AbraMix</h1>
			<Suspense fallback={<h2>Loading...</h2>}>
				<Albums search={search} />
			</Suspense>
		</>
	);
}

async function Albums({ search }) {
	const albums = await getAll();
	return <SearchableAlbumList search={search} albums={albums} />;
}
