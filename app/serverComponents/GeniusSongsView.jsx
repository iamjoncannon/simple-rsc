import React, { Suspense } from 'react';
import hydratorMap from '../../hydratorMap';
import { MIN_SEARCH_LENGTH } from '../../constants';

const GeniusSongCard = ({ song }) => {
	return (
		<div className="genius-card">
			<div>
				<h4>Artist: {song.artist_names}</h4>
				<h4>Title: {song.title}</h4>
				<h4>Album: {song.albumName}</h4>
				<h4>Released: {song.release_date}</h4>
			</div>
			<img src={song?.song_art_image_thumbnail_url} style={{ height: '10rem' }} />
		</div>
	);
};

async function GeniusSongsView({ search, songData }) {
	return search?.length > MIN_SEARCH_LENGTH ? (
		<div className="genius-card-container">
			<>
				<h3>
					<i>{`Genius Song Results for "${search}": ${songData?.length}`}</i>
				</h3>

				<div className="genius-card-container-2">
					{songData?.map((song) => (
						<GeniusSongCard key={song?.id} {...{ song }} />
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
// be transformed from GeniusSongsView -> "TO", "VQ" etc

// also, we might want to be flexible and have a
// one to many relationship between components
// and their server hydrators
GeniusSongsView.hydrator = hydratorMap.GeniusSongsView;
export default GeniusSongsView;
