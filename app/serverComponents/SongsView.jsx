import React from 'react';
import hydratorMap from '../../hydratorMap';
import { MIN_SEARCH_LENGTH } from '../../constants';

const SongCard = ({ song }) => {
	return (
		<div className="genius-card genius-card-song">
			<table>
				<tr>
					<td>Title</td> <td>{song.title}</td>
				</tr>
				<tr>
					<td>Artist</td> <td>{song.artist_names}</td>
				</tr>
				<tr>
					<td>Album</td> <td>{song.albumName}</td>
				</tr>
				<tr>
					<td>Released</td> <td>{song.release_date}</td>
				</tr>
			</table>
			<img src={song?.song_art_image_thumbnail_url} />
		</div>
	);
};

async function SongsView({ search, songData }) {
	return search?.length > MIN_SEARCH_LENGTH ? (
		<div className="genius-card-container">
			<>
				<h3>
					<i>{`Genius Song Results for "${search}": ${songData?.length}`}</i>
				</h3>

				<div className="genius-card-container-2">
					{songData?.map((song) => (
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
