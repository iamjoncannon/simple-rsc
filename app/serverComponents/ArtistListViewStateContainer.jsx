// @ts-nocheck
import React from 'react';
import ServerComponentShell from '../ServerComponentShell';
import ArtistListView from './ArtistListView';
import styled from 'styled-components';

const StyledPageWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;

	button {
		font-size: 0.75rem;
		width: 4rem;
	}
`;

const ArtistListViewStateContainer = ({ search, source }) => {
	const [page, nextPage] = React.useState(0);
	const [remoteState, setRemoteState] = React.useState(null);

	const onHydrate = React.useCallback((remoteState) => {
		setRemoteState(remoteState);
	}, []);

	const hasResults = React.useMemo(() => {
		return remoteState !== null && remoteState?.pagination?.totalCount;
	}, [remoteState]);

	return (
		<div
			className={`genius-list-container  animate__animated animate__fadeIn ${
				!hasResults ? 'hidden' : ''
			}`}
		>
			<ServerComponentShell onHydrate={onHydrate}>
				<ArtistListView {...{ search, source, page }} />
			</ServerComponentShell>

			{hasResults && (
				<StyledPageWrapper>
					<button
						className={remoteState?.pagination?.hasPrevPage ? 'opacity-50' : ''}
						disabled={remoteState?.pagination?.hasPrevPage}
						onClick={() => nextPage((page) => page - 1)}
					>
						Last Page
					</button>
					<button
						disabled={remoteState?.pagination?.hasNextPage}
						className={remoteState?.pagination?.hasNextPage ? 'opacity-50' : ''}
						onClick={() => nextPage((page) => page + 1)}
					>
						Next Page
					</button>
				</StyledPageWrapper>
			)}
		</div>
	);
};

export default ArtistListViewStateContainer;
