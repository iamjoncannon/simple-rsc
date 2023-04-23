import styled from 'styled-components';

/*
    defining styles in parent to prevent
    duplicating in server rendered code
*/

const breakPointLarge = '1300px';
const breakPointMedium = '1000px';

export const StyledContainer = styled.div`
	min-height: 100vh;
	background-color: #202124;

	.magnifying-glass {
		height: 1.5rem;
		position: relative;
		right: 2.5rem;
	}

	h1 {
		cursor: pointer;
		font-size: 2rem;
	}

	.jenius-logo {
		margin-left: 2rem;
	}

	input {
		width: 25rem;
		padding-left: 1rem;
		margin-left: 4rem;
		height: 2.5rem;
		border-radius: 1rem;

		&:hover,
		&:focus {
			outline: #64ffaf;
		}
	}

	header {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background-color: #fffc64;
		height: 3.5rem;
		padding: 0.5rem;
		position: sticky;
		top: 0;
		z-index: 1;
	}

	main {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;

		@media (max-width: ${breakPointLarge}) {
			flex-direction: column;
		}
	}

	.genius-card-container {
		margin: 2rem;
		min-width: 25vw;
		max-width: 50vw;
		background-color: #64ffaf;
		padding: 1rem;
		border-radius: 2rem;

		text-transform: capitalize;

		@media (max-width: ${breakPointMedium}) {
			max-width: 30rem;
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
		overflow-x: hidden;
		max-width: 50rem;

		> div {
			width: 17rem;
			margin-bottom: 1rem;
		}
	}

	.genius-card-song {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 20rem;
		margin-left: auto;
		margin-right: auto;

		img {
			height: 7.5rem;
			width: fit-content;
		}

		table {
			border-collapse: collapse;
			width: 100%;
			max-width: 80rem;
			margin-bottom: 1rem;
		}

		th,
		td {
			padding: 8px;
			text-align: left;
		}
	}

	.genius-card-artist {
		flex-direction: column;

		.title {
			font-weight: 800;
			font-size: 2rem;
			margin: auto;
		}

		img {
			max-height: 10rem;
			width: fit-content;
		}

		.img-hero {
			max-height: 20rem;
			width: fit-content;
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
