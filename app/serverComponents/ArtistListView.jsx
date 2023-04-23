// @ts-nocheck
import React from 'react';
import { MIN_SEARCH_LENGTH } from '../../constants';
import hydratorConstants from '../../server/hydratorConstants';

const ArtistListCard = ({ artist }) => {
	return (
		<div className="genius-card-song">
			<img src={artist?.imageUrl} />

			<table>
				<tr>
					<td>
						<a href={`/?search=${artist.name}`}>{artist.name}</a>
					</td>
				</tr>
			</table>
		</div>
	);
};

async function ArtistListView({ search, artistData, source }) {
	return search?.length > MIN_SEARCH_LENGTH && artistData?.length > 0 ? (
		<div className="genius-list-container  animate__animated animate__fadeIn ">
			<>
				<h3>
					<i>{`${source} Artist Results: ${artistData?.length}`}</i>
				</h3>

				<div className="genius-list-container-2 genius-list-container--half">
					{artistData?.slice(0, 10)?.map((artist) => (
						<ArtistListCard key={artist?.id} {...{ artist }} />
					))}
				</div>
			</>
		</div>
	) : (
		<></>
	);
}

ArtistListView.hydrator = hydratorConstants.ArtistListView;
ArtistListView.componentName = hydratorConstants.ArtistListView;
export default ArtistListView;
