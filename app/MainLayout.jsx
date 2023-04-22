// @ts-nocheck
import React from 'react';
import GeniusSongsView from './serverComponents/GeniusSongsView.jsx';
import GeniusArtistView from './serverComponents/GeniusArtistView.jsx';
import Shell from './Shell.jsx';

const MainLayout = () => {
	const [search, setSearch] = React.useState('');

	return (
		<div>
			<header
				style={{
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center',
					backgroundColor: '#fffc64',
					height: '3.5rem',
					padding: '.5rem'
				}}
			>
				<h1 style={{ cursor: 'pointer', fontSize: '2rem' }}>Jenius</h1>
				<input
					style={{ width: '15rem', paddingLeft: '1rem', marginLeft: '4rem' }}
					placeholder="Search for Artist"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				></input>
			</header>
			<Shell>
				<GeniusSongsView {...{ search }} />
			</Shell>
			<Shell>
				<GeniusArtistView />
			</Shell>
		</div>
	);
};

export default MainLayout;
