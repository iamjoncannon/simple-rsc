import React from 'react';
import hydratorMap from '../../hydratorMap';

const ArtistCard = ({ artist }) => {
	return (
		<div className="genius-card genius-card-artist animate__animated animate__fadeIn">
			<div>
				<span className="title">{artist?.name}</span>
				<img src={artist?.headerImageUrl} className="img-hero" />
			</div>
			<div style={{ float: 'right' }}>
				<h4 dangerouslySetInnerHTML={{ __html: artist?.description || '' }} />
			</div>
		</div>
	);
};

ArtistCard.hydrator = hydratorMap.ArtistCard;
export default ArtistCard;
