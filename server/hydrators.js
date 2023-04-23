import { PrismaClient } from '@prisma/client';
import { MIN_SEARCH_LENGTH } from '../constants.js';
const prisma = new PrismaClient();

// fetch data from user input

const getFallback = async () =>
	await prisma.artist.findFirst({
		where: {
			name: {
				equals: 'Jimi Hendrix'
			}
		}
	});

const ArtistCard = async () => {
	const id = Math.floor(Math.random() * 1000);

	const result =
		await prisma.$queryRaw`SELECT * FROM Artist WHERE LENGTH(description) > 500 LIMIT 1000 OFFSET ${id}`;

	return {
		// @ts-ignore
		artist: result[0] || (await getFallback())
	};
};

const SongsView = async ({ search }) => {
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
		search,
		songData
	};
};

const ArtistView = async ({ search, source }) => {
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
		search,
		source,
		artistData
	};
};

const hydrators = {
	SongsView,
	ArtistView,
	ArtistCard
};

export default hydrators;
