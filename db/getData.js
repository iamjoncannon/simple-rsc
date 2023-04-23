import fs from 'node:fs';
import pkg from 'disconnect';
import { accessToken, discogs_consumer_key, discogs_consumer_secret } from './token.js';
const { Client } = pkg;

const discogs = new Client({
	consumerKey: discogs_consumer_key,
	consumerSecret: discogs_consumer_secret
});

const entity = 'songs';
const outfile = '/1000-genius-songs';

let entities = [];
const size = 30000;
const fileSize = 50;
const start = 20001;
const waitInSeconds = 0.25; // try not to get throttled

const geniusCall = (i) => {
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
			if (i % 25 === 0) {
				console.log('i data ', i, data);
			}
			entities.push(data);
		});
};

const discogsCall = (i) =>
	discogs
		.get(`/${entity}/${i}`)
		.then((data) => {
			if (i % 25 === 0) {
				console.log('i data ', i, data);
			}
			entities.push(data);
		})
		.catch((err) => {
			console.log(err);
		});

const call = geniusCall;

(function myLoop(i) {
	setTimeout(function () {
		call(i);
		++i;

		if (i % fileSize === 0) {
			fs.writeFile(process.cwd() + outfile + `-${i}.json`, JSON.stringify(entities), (err) =>
				console.log(err)
			);
			entities = [];
		}

		if (i < size) {
			myLoop(i);
		}
	}, waitInSeconds * 1000);
})(start);
