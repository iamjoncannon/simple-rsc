import styled from 'styled-components';

export const StyledPageWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;

	button {
		font-size: 0.75rem;
		width: 4rem;
	}

	button:hover {
		color: #64ffaf;
	}
`;

const PaginationWrapper = ({ remoteState, nextPage }) => {
	return (
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
	);
};

export default PaginationWrapper;
