import React from 'react';
import hydratorMap from '../../hydratorMap';

const ArtistCard = async ({ artist }) => {
	return (
		<div className="genius-card genius-card-artist animate__animated animate__fadeIn">
			<div>
				<a href={`?search=${artist?.name}`}>
					<span className="title">{artist?.name}</span>
				</a>
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
