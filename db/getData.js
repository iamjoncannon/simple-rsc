import fs from 'node:fs';
import { accessToken } from './accessToken.js';

const entity = 'songs';
const outfile = '/1000songs.json';

let artists = [];
const size = 10000;
const fileSize = 500;
const start = 1000;
const waitInSeconds = 0.5; // try not to get throttled

const call = (i) => {
	fetch(`https://api.genius.com/${entity}/${i}?access_token=${accessToken}&text_format=html`, {
		headers: {
			accept: 'application/json, text/plain, */*',
			'accept-language': 'en-US,en;q=0.9',
			'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
			'sec-ch-ua-mobile': '?0',
			'sec-ch-ua-platform': '"macOS"',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-site',
			Referer: 'https://docs.genius.com/', // don't seem to get throttled
			'Referrer-Policy': 'strict-origin-when-cross-origin'
		},
		body: null,
		method: 'GET'
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			console.log('i data ', i, data);
			artists.push(data);
		});
};

(function myLoop(i) {
	setTimeout(function () {
		call(i);
		++i;
		if (i < size) {
			myLoop(i);
		}

		if (i % fileSize === 0) {
			fs.writeFile(process.cwd() + outfile + `-${i}`, JSON.stringify(artists), (err) =>
				console.log(err)
			);
			artists = [];
		}
	}, waitInSeconds * 1000);
})(start);
