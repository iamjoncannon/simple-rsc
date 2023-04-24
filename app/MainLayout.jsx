// @ts-nocheck
import React from 'react';
import SongsListView from './serverComponents/SongsListView.jsx';
import ServerComponentShell from './ServerComponentShell.jsx';
import { StyledContainer } from './styleSheet.jsx';
import { MagnifyingGlass, RandomIcon } from './components.jsx';
import ArtistFeatureCard from './serverComponents/ArtistFeatureCard.jsx';
import { MIN_SEARCH_LENGTH } from '../constants.js';
import hydratorConstants from '../server/hydratorConstants.js';
import ArtistListViewStateContainer from './serverComponents/ArtistListViewStateContainer.jsx';

const MainLayout = () => {
	const [search, setSearch] = React.useState();
	const inputRef = React.useRef(null);

	const onLogoClick = React.useCallback(() => {
		setSearch('');
		if (inputRef?.current?.value) {
			inputRef.current.value = '';
		}
		window.history.pushState({}, '', '/');
	}, []);

	React.useEffect(() => {
		setSearch(decodeURIComponent(window.location.search.replace('?search=', '')));
	}, []);

	return (
		<StyledContainer>
			<header>
				<i>
					<h1 className="jenius-logo" onClick={onLogoClick}>
						Jenius
					</h1>
				</i>
				<input
					ref={inputRef}
					placeholder="Search Jenius"
					defaultValue={search}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
				></input>
				<MagnifyingGlass />
				<RandomIcon />
			</header>
			<main>
				{search?.length <= MIN_SEARCH_LENGTH && (
					<ServerComponentShell>
						<ArtistFeatureCard hydrator={hydratorConstants.ArtistFeatureCardForSplashPage} />
					</ServerComponentShell>
				)}

				{search?.length > MIN_SEARCH_LENGTH && (
					<>
						<div className="grid-section-artist">
							<ServerComponentShell>
								<ArtistFeatureCard
									hydrator={hydratorConstants.ArtistFeatureCardOneResult}
									{...{ search }}
								/>
							</ServerComponentShell>
						</div>
						<div className="grid-section-list grid-section-list--artist">
							<ArtistListViewStateContainer {...{ search, source: 'genius' }} />
							<ArtistListViewStateContainer {...{ search, source: 'discogs' }} />
						</div>
						<div className="grid-section-list grid-section-list--song">
							<ServerComponentShell>
								<SongsListView {...{ search }} />
							</ServerComponentShell>
						</div>
					</>
				)}
			</main>
		</StyledContainer>
	);
};

export default MainLayout;
