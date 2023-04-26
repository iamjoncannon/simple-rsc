// @ts-nocheck
import React, { useMemo } from 'react';
import ServerComponentShell from '../ServerComponentShell';
import PaginationWrapper from './Pagination';
import SongsListView from './SongsListView';

function SongsListLoading({ pagination }) {
	const title = useMemo(() => {
		return !!pagination?.pageStart
			? `Genius Song Results ${pagination?.pageStart}-${pagination?.pageEnd} of ${pagination?.totalCount}`
			: 'Fetching Song Results';
	}, [pagination]);

	return (
		<div>
			<>
				<h3>
					<i>{title}</i>
				</h3>

				<div className="genius-list-container-2 genius-list-container--full"></div>
			</>
		</div>
	);
}

const SongsListViewStateContainer = ({ search }) => {
	const [page, nextPage] = React.useState(0);
	const [remoteState, setRemoteState] = React.useState(null);

	const hasResults = React.useMemo(() => {
		return remoteState !== null && remoteState?.pagination?.totalCount;
	}, [remoteState]);

	return (
		<div className={`genius-list-container  animate__animated animate__fadeIn`}>
			<ServerComponentShell
				onHydrate={setRemoteState}
				fallback={<SongsListLoading {...{ pagination: remoteState?.pagination || '' }} />}
			>
				<SongsListView {...{ search, page }} />
			</ServerComponentShell>

			{hasResults ? <PaginationWrapper {...{ page, remoteState, nextPage }} /> : ''}
		</div>
	);
};

export default SongsListViewStateContainer;
