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

	// 	@media (max-width: ${breakPointLarge}) {
	// 		flex-direction: column;
	// 	}
	// }

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

	.grid-section-artist {
		// background-color: green;
		height: calc(100vh - 3.5rem);
		flex: 3;
	}

	/* song */

	.grid-section-song {
		height: calc(100vh - 3.5rem);
		flex: 1;
		min-width: 20rem;
		max-width: 20rem;
	}

	.genius-card-container--song {
		background-color: #fffc64;
		margin-top: 2rem;
		margin-right: 2rem;
		padding: .25rem;
		border-radius: .5rem;

		h3 {
			font-size: .75rem !important; 
		}

	}

	.genius-card-container--song-2 {
		max-height: calc(100vh - 10rem);
		min-height: 50vh;
		overflow-y: scroll;
		margin-top: 0.5rem;
	}

	.genius-card-song {
		display: flex;
		background-color: #fffc64;
		border-bottom: 1px solid black;
		padding: .25rem .5rem .25rem .5rem;

	
		img {
			height: 5rem;
			min-width: fit-content;
			margin-right: 1rem;
			padding-top: .25rem;
		}

		table {
			border-collapse: collapse;
			width: 100%;
			max-width: 80rem;

			tr:first-child {
				td {
					font-size: .8rem;
					font-weight: bold;
				}
			}
		}

		th,
		td {
			padding-bottom: 2px;
			text-align: left;
			font-size: .7rem;
		}
	}
`;
