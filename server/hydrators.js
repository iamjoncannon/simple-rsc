import { PrismaClient } from '@prisma/client';
import { MIN_SEARCH_LENGTH } from '../constants.js';
const prisma = new PrismaClient();

const ArtistFeatureCardOneResult = async ({ search }) => {
	let artistData = [];
	if (search?.length > MIN_SEARCH_LENGTH) {
		// @ts-ignore
		const exactMatch = await prisma.artist.findMany({
			where: {
				name: {
					equals: String(search)
				}
			}
		});

		artistData = exactMatch;

		if (exactMatch.length === 0) {
			// @ts-ignore
			artistData = await prisma.artist.findMany({
				where: {
					name: {
						contains: String(search)
					}
				}
			});

			artistData.sort((a, b) => b.description.length - a.description.length);
		}
	}

	return {
		hydratorProps: {
			artist: artistData[0]
		},
		stateFromHydration: { length: artistData.length }
	};
};

const getFallback = async () =>
	await prisma.artist.findFirst({
		where: {
			name: {
				equals: 'Jimi Hendrix'
			}
		}
	});

const ArtistFeatureCardForSplashPage = async () => {
	const id = Math.floor(Math.random() * 1000);

	const result =
		await prisma.$queryRaw`SELECT * FROM Artist WHERE LENGTH(description) > 500 LIMIT 1000 OFFSET ${id}`;

	return {
		hydratorProps: {
			// @ts-ignore
			artist: result[0] || (await getFallback())
		}
	};
};

const SongsListView = async ({ search }) => {
	let songData = [];
	if (search?.length > MIN_SEARCH_LENGTH) {
		songData = await prisma.song.findMany({
			where: {
				searchIndex: {
					contains: String(search)
				}
			}
		});
	}

	return {
		hydratorProps: {
			search,
			songData
		}
	};
};

const ArtistListView = async ({ search, source }) => {
	let artistData = [];
	if (search?.length > MIN_SEARCH_LENGTH) {
		artistData = await prisma.artist.findMany({
			where: {
				name: {
					contains: String(search)
				},
				source: {
					equals: String(source)
				}
			}
		});
	}

	return {
		hydratorProps: {
			search,
			source,
			artistData
		}
	};
};

const hydrators = {
	SongsListView,
	ArtistListView,
	ArtistFeatureCardForSplashPage,
	ArtistFeatureCardOneResult
};

export default hydrators;
