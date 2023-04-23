import React from 'react';
import hydratorConstants from '../../server/hydratorConstants';

const ArtistFeatureCard = async ({ artist }) => {
	return (
		<div className="genius-card genius-card-artist animate__animated animate__fadeIn">
			{!!artist && (
				<>
					<div>
						<a href={`?search=${artist?.name}`}>
							<span className="title">{artist?.name}</span>
						</a>
						<img src={artist?.headerImageUrl} className="img-hero" />
					</div>
					<div style={{ float: 'right' }}>
						<h4 dangerouslySetInnerHTML={{ __html: artist?.description || '' }} />
					</div>
				</>
			)}
			{!!!artist && <div className="genius-card-artist--no-result">No artist result.</div>}
		</div>
	);
};

ArtistFeatureCard.componentName = hydratorConstants.ArtistFeatureCard;
export default ArtistFeatureCard;
