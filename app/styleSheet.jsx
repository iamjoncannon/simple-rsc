import styled from 'styled-components';

/*
    defining styles in parent to prevent
    duplicating in server rendered code
*/

export const StyledContainer = styled.div`
	h1 {
		cursor: pointer;
		font-size: 2rem;
	}

	input {
		width: 15rem;
		padding-left: 1rem;
		margin-left: 4rem;
	}

	header {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background-color: #fffc64;
		height: 3.5rem;
		padding: 0.5rem;
	}

	main {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;

		@media (max-width: 1000px) {
			flex-direction: column;
		}
	}

	.genius-card-container {
		margin: 2rem;
		max-width: 50vw;

		@media (max-width: 1000px) {
			max-width: 90%;
		}
	}

	.genius-card-container-2 {
		height: 75vh;
		overflow-y: scroll;
		margin-top: 0.5rem;
	}

	.genius-card {
		background-color: #fffc64;
		padding: 1rem;
		margin: 1rem;
		display: flex;
		justify-content: space-around;
		border-radius: 2rem;

		> div {
			width: 17rem;
		}
	}

	.genius-card-artist {
		flex-direction: column;

		.title {
			font-weight: 800;
			font-size: 3rem;
			margin: auto;
		}

		.img-hero {
			height: 10rem;
			height: fit-content;
			margin: auto;
		}

		> div {
			width: 100%;
		}

		p {
			margin-bottom: 0.5rem;
		}

		iframe {
			max-width: 100%;
		}
	}
`;
