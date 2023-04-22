import React from 'react';
import ComponentC from './C/ComponentC';
import hydratorMap from '../../hydratorMap';
import { MIN_SEARCH_LENGTH } from '../../constants';

const GeniusSongCard = ({ song }) => {
	return (
		<div
			style={{
				backgroundColor: '#fffc64',
				padding: '1rem',
				margin: '1rem',
				display: 'flex',
				justifyContent: 'space-around',
				borderRadius: '2rem'
			}}
		>
			<div style={{ width: '17rem' }}>
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
	return (
		<div style={{ margin: '2rem', maxWidth: '35rem' }}>
			{search?.length > MIN_SEARCH_LENGTH ? (
				<>
					<h3>{`Genius Song Results for "${search}": ${songData?.length}`}</h3>

					<div style={{ height: '75vh', overflowY: 'scroll', marginTop: '.5rem' }}>
						{songData?.map((song) => (
							<GeniusSongCard key={song?.id} {...{ song }} />
						))}
					</div>
				</>
			) : (
				<></>
			)}
		</div>
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
