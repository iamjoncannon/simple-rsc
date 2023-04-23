// @ts-nocheck
import React from 'react';
import GeniusSongsView from './serverComponents/GeniusSongsView.jsx';
import GeniusArtistView from './serverComponents/GeniusArtistView.jsx';
import Shell from './Shell.jsx';
import { StyledContainer } from './styleSheet.jsx';

const MainLayout = () => {
	const [search, setSearch] = React.useState('');

	return (
		<StyledContainer>
			<header>
				<h1>Jenius</h1>
				<input
					style={{}}
					placeholder="Search for Artist"
					onChange={(e) => setSearch(e.target.value)}
				></input>
			</header>
			<main>
				<Shell>
					<GeniusArtistView {...{ search }} />
				</Shell>
				<Shell>
					<GeniusSongsView {...{ search }} />
				</Shell>
			</main>
		</StyledContainer>
	);
};

export default MainLayout;
