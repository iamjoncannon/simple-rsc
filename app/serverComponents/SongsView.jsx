import React from 'react';
import hydratorMap from '../../hydratorMap';
import { MIN_SEARCH_LENGTH } from '../../constants';

const SongCard = ({ song }) => {
	return (
		<div className="genius-card-song">
			<img src={song?.song_art_image_thumbnail_url} />

			<table>
				<tr>
					<td>{song.title}</td>
				</tr>
				<tr>
					<td>
						<a href={`/?search=${song.artist_names}`}>{song.artist_names}</a>
					</td>
				</tr>
				<tr>
					<td>
						<a href={`/?search=${song.albumName}`}>{song.albumName}</a>
					</td>
				</tr>
				<tr>
					<td>{song.release_date}</td>
				</tr>
			</table>
		</div>
	);
};

async function SongsView({ search, songData }) {
	return search?.length > MIN_SEARCH_LENGTH && songData?.length > 0 ? (
		<div className="genius-card-container--song animate__animated animate__fadeIn ">
			<>
				<h3>
					<i>{`Genius Song Results: ${songData?.length}`}</i>
				</h3>

				<div className="genius-card-container--song-2">
					{songData?.slice(0, 10)?.map((song) => (
						<SongCard key={song?.id} {...{ song }} />
					))}
				</div>
			</>
		</div>
	) : (
		<></>
	);
}

// this has to be explicitly set since the code
// is minified and the component name var will
// be transformed from SongsView -> "TO", "VQ" etc

// also, we might want to be flexible and have a
// one to many relationship between components
// and their server hydrators
SongsView.hydrator = hydratorMap.SongsView;
export default SongsView;
