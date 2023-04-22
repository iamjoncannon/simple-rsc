const { PrismaClient } = require('@prisma/client');
const arists1 = require('./1000artists.json');
const artists2 = require('./2000artists.json');
const songs1 = require('./1000songs.json');
const songs2 = require('./1000songs-1500.json');
const songs3 = require('./1000songs-2000.json');
const songs4 = require('./1000songs-2500.json');
const songs5 = require('./1000songs-3000.json');

const prisma = new PrismaClient();

const insertArtists = () => {
	// @ts-ignore
	[...arists1, ...artists2].forEach(async (each) => {
		if (each.response) {
			const r = each.response;

			const artist = r.artist;
			const newArtist = await prisma.artist.create({
				// @ts-ignore
				data: {
					name: artist.name,
					geniusId: artist.id,
					imageUrl: artist.image_url,
					headerImageUrl: artist.header_image_url,
					url: artist.url,
					description: artist.description.html
				}
			});

			console.log('artist inserted:');
			console.log(newArtist);
		}
	});
};

const insertSongs = () => {
	// @ts-ignore
	[...songs1, ...songs2, ...songs3, ...songs4, ...songs5].forEach(async (each) => {
		if (each?.response?.song) {
			try {
				const r = each.response;

				const song = r.song;

				const featured_artists = song?.featured_artists?.map((each) => each?.name).join(' ');
				const primary_artists = song?.primary_artists?.map((each) => each?.name).join(' ');
				const writer_artists = song?.writer_artists?.map((each) => each?.name).join(' ');

				const newSong = await prisma.song.create({
					// @ts-ignore
					data: {
						geniusId: song.id,
						artist_names: song.artist_names,
						description: song.description.html,
						full_title: song.full_title,
						title: song.title,
						url: song.url,
						albumName: song.album?.name,
						featured_artists,
						primary_artists,
						writer_artists,
						header_image_thumbnail_url: song.header_image_thumbnail_url,
						header_image_url: song.header_image_url,
						release_date: song.release_date,
						song_art_image_thumbnail_url: song.song_art_image_thumbnail_url,
						song_art_image_url: song.song_art_image_url,
						searchIndex: `${song.artist_names} ${song.title} ${song.albumName} ${featured_artists} ${primary_artists} ${writer_artists}`
					}
				});

				console.log('newSong inserted:');
				console.log(newSong);
			} catch (err) {
				console.log(err);
			}
		}
	});
};

async function main() {
	insertArtists();
	insertSongs();
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
