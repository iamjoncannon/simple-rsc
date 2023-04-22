import { PrismaClient } from '@prisma/client';
import { MIN_SEARCH_LENGTH } from '../constants.js';
const prisma = new PrismaClient();

// fetch data from user input

const GeniusSongsView = async ({ search }) => {
	// db call

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

const GeniusArtistView = (propsFromShell) => ({
	...propsFromShell,
	propFromHydrator: 'propFromHydrator'
});

const hydrators = {
	GeniusSongsView,
	GeniusArtistView
};

export default hydrators;
