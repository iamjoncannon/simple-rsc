// @ts-nocheck
import React from 'react';
import { MIN_SEARCH_LENGTH } from '../../constants';
import hydratorMap from '../../hydratorMap';
import ArtistCard from './ArtistCard';

async function ArtistView({ search, artistData, source }) {
	return search?.length > MIN_SEARCH_LENGTH && artistData?.length > 0 ? (
		<div className="genius-card-container animate__animated animate__fadeIn ">
			<>
				<h3>
					<i>{`${source} Artist Results for "${search}": ${artistData?.length}`}</i>
				</h3>

				<div className="genius-card-container-2">
					{artistData?.slice(0, 10)?.map((artist) => (
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
