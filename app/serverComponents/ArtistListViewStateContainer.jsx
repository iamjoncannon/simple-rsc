// @ts-nocheck
import React from 'react';
import ServerComponentShell from '../ServerComponentShell';
import ArtistListView from './ArtistListView';
import PaginationWrapper from './Pagination';

const ArtistListViewStateContainer = ({ search, source }) => {
	const [page, nextPage] = React.useState(0);
	const [remoteState, setRemoteState] = React.useState(null);

	const hasResults = React.useMemo(() => {
		return remoteState !== null && remoteState?.pagination?.totalCount;
	}, [remoteState]);

	return (
		<div
			className={`genius-list-container  animate__animated animate__fadeIn ${
				!hasResults ? 'hidden' : ''
			}`}
		>
			<ServerComponentShell onHydrate={setRemoteState}>
				<ArtistListView {...{ search, source, page }} />
			</ServerComponentShell>

			{hasResults && <PaginationWrapper {...{ remoteState, nextPage }} />}
		</div>
	);
};

export default ArtistListViewStateContainer;
