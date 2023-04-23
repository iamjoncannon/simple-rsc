import React from 'react';
import { MIN_SEARCH_LENGTH } from '../../constants';
import hydratorMap from '../../hydratorMap';

const ArtistCard = ({ artist }) => {
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

async function ArtistView({ search, artistData }) {
	return search?.length > MIN_SEARCH_LENGTH ? (
		<div className="genius-card-container">
			<>
				<h3>
					<i>{`Genius Artist Results for "${search}": ${artistData?.length}`}</i>
				</h3>

				<div className="genius-card-container-2">
					{artistData?.map((artist) => (
						<ArtistCard key={artist?.id} {...{ artist }} />
					))}
				</div>
			</>
		</div>
	) : (
		<></>
	);
}

ArtistView.hydrator = hydratorMap.ArtistView;
export default ArtistView;
