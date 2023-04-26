// @ts-nocheck
import React from 'react';
import ServerComponentShell from '../ServerComponentShell';
import ArtistListView from './ArtistListView';
import PaginationWrapper from './Pagination';

function Loading({ source, pagination }) {
	const title = React.useMemo(() => {
		return !!pagination?.pageStart
			? `${source} Artist Results ${pagination?.pageStart}-${pagination?.pageEnd} of ${pagination?.totalCount}`
			: 'Fetching Artist Results';
	}, [pagination]);

	return (
		<div>
			<>
				<h3>
					<i>{title}</i>
				</h3>

				<div className="genius-list-container-2 genius-list-container--half"></div>
			</>
		</div>
	);
}

const ArtistListViewStateContainer = ({ search, source }) => {
	const [page, nextPage] = React.useState(0);
	const [remoteState, setRemoteState] = React.useState(null);

	const hasResults = React.useMemo(() => {
		return remoteState !== null && remoteState?.pagination?.totalCount;
	}, [remoteState]);

	return (
		<div className={`genius-list-container  animate__animated animate__fadeIn `}>
			<ServerComponentShell
				onHydrate={setRemoteState}
				fallback={
					<Loading {...{ search, source, page, pagination: remoteState?.pagination || '' }} />
				}
			>
				<ArtistListView {...{ search, source, page }} />
			</ServerComponentShell>

			{hasResults ? <PaginationWrapper {...{ page, remoteState, nextPage }} /> : <></>}
		</div>
	);
};

export default ArtistListViewStateContainer;
