import { PrismaClient } from '@prisma/client';
import { MIN_SEARCH_LENGTH } from '../constants.js';
const prisma = new PrismaClient();

// fetch data from user input

const GeniusSongsView = async ({ search }) => {
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

const GeniusArtistView = async ({ search }) => {
	let artistData = [];
	if (search?.length > MIN_SEARCH_LENGTH) {
		artistData = await prisma.artist.findMany({
			where: {
				name: {
					contains: String(search)
				}
			}
		});
	}

	return {
		search,
		artistData
	};
};

const hydrators = {
	GeniusSongsView,
	GeniusArtistView
};

export default hydrators;
