const { PrismaClient } = require('@prisma/client');
const songs1 = require('./1000songs.json');
const songs2 = require('./1000songs-1500.json');
const songs3 = require('./1000songs-2000.json');
const songs4 = require('./1000songs-2500.json');
const songs5 = require('./1000songs-3000.json');
const fs = require('node:fs');

const prisma = new PrismaClient();

function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
const insertGeniusArtists = async () => {
	let i = 1000;

	while (i < 20001) {
		console.log('insertGeniusArtists ', i);

		// read file

		const filePath = process.cwd() + `/genius-artists-${i}.json`;

		// insert from file

		await fs.readFile(filePath, async (err, data) => {
			const artists = JSON.parse(String(data));

			await artists.forEach(async (each) => {
				if (each.response) {
					const r = each.response;

					const artist = r.artist;
					try {
						const newArtist = await prisma.artist.create({
							// @ts-ignore
							data: {
								name: artist.name,
								source: 'genius',
								sourceId: artist.id,
								imageUrl: artist.image_url,
								headerImageUrl: artist.header_image_url,
								url: artist.url,
								description: artist.description.html
							}
						});
					} catch (err) {
						console.log(err);
					}
				}

				await timeout(1000);
			});

			await timeout(1000);
		});

		await timeout(5000);

		i += 1000;
	}
};

const insertGeniusSong = async (each) => {
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
					source: 'genius',
					sourceId: song.id,
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
					searchIndex: `${song.artist_names} ${song.title} ${song.album?.name} ${featured_artists} ${primary_artists} ${writer_artists}`
				}
			});
		} catch (err) {
			console.log(err);
		}
		await timeout(1000);
	}
};

const insertGeniusSongs = async () => {
	let i = 3050;

	while (i < 20001) {
		console.log('insertGeniusSongs ', i);
		// read file

		const filePath = process.cwd() + `/1000-genius-songs-${i}.json`;

		// insert from file

		await fs.readFile(filePath, async (err, data) => {
			const songs = JSON.parse(String(data));

			await songs?.forEach(async (each) => {
				await insertGeniusSong(each);
			});
			await timeout(50);
		});
		await timeout(500);

		i += 50;
	}
};

const insertGeniusSongs1 = async () => {
	// @ts-ignore
	[...songs1, ...songs2, ...songs3, ...songs4, ...songs5].forEach(async (each) => {
		await insertGeniusSong(each);
		await timeout(5000);
	});
};

const insertDiscogsArtists = async () => {
	let i = 50;

	while (i < 1000) {
		console.log('insertDiscogsArtists ', i);
		// read file

		const filePath = process.cwd() + `/1000-discogs-artists-${i}.json`;

		// insert from file

		await fs.readFile(filePath, async (err, data) => {
			const artists = JSON.parse(String(data));

			await artists.forEach(async (artist) => {
				if (!!artist) {
					try {
						const newArtist = await prisma.artist.create({
							// @ts-ignore
							data: {
								name: artist.name,
								source: 'discogs',
								sourceId: artist.id,
								imageUrl: artist.images?.[0]?.uri || '',
								headerImageUrl: artist.images?.[0]?.uri || '',
								url: artist.uri,
								description: artist.profile
							}
						});
					} catch (err) {
						console.log(err);
					}
				}
			});
		});
		await timeout(1000);

		i += 50;
	}
};

async function main() {
	console.log('--insertGeniusArtists--');
	// await insertGeniusArtists();

	console.log('--insertGeniusSongs--');

	// await insertGeniusSongs();
	console.log('--insertGeniusSongs1--');

	// await insertGeniusSongs1();
	console.log('--insertDiscogsArtists--');

	await insertDiscogsArtists();
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
