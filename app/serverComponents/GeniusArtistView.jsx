import React from 'react';
import { MIN_SEARCH_LENGTH } from '../../constants';
import hydratorMap from '../../hydratorMap';

const GeniusArtistCard = ({ artist }) => {
	return (
		<div className="genius-card genius-card-artist">
			<div>
				<span className="title">{artist.name}</span>
				<img src={artist?.headerImageUrl} className="img-hero" />
			</div>
			<div style={{ float: 'right' }}>
				<h4 dangerouslySetInnerHTML={{ __html: artist.description }} />
			</div>
		</div>
	);
};

async function GeniusArtistView({ search, artistData }) {
	return (
		<div className="genius-card-container">
			{search?.length > MIN_SEARCH_LENGTH ? (
				<>
					<h3>{`Genius Artist Results for "${search}": ${artistData?.length}`}</h3>

					<div className="genius-card-container-2">
						{artistData?.map((artist) => (
							<GeniusArtistCard key={artist?.id} {...{ artist }} />
						))}
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
}

GeniusArtistView.hydrator = hydratorMap.GeniusArtistView;
export default GeniusArtistView;
