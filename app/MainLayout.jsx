// @ts-nocheck
import React, { Suspense } from 'react';
import ServerComponentShell from './ServerComponentShell.jsx';
import { StyledContainer } from './styleSheet.jsx';
import { MagnifyingGlass } from './components.jsx';
import ArtistFeatureCard from './serverComponents/ArtistFeatureCard.jsx';
import { MIN_SEARCH_LENGTH } from '../constants.js';
import hydratorConstants from '../server/hydratorConstants.js';
import ArtistListViewStateContainer from './serverComponents/ArtistListViewStateContainer.jsx';
import SongsListViewStateContainer from './serverComponents/SongsListViewStateContainer.jsx';
import ArtistFeatureCardLoading from './serverComponents/states/ArtistFeatureCardLoading.jsx';

const MainLayout = () => {
	const [search, setSearch] = React.useState('');
	const [typed, setTyped] = React.useState();
	const inputRef = React.useRef(null);

	const onLogoClick = React.useCallback(() => {
		setSearch('');
		if (inputRef?.current?.value) {
			inputRef.current.value = '';
		}
		window.history.pushState({}, '', '/');
	}, []);

	const onType = React.useCallback((e) => {
		setTyped(e.target.value);
	}, []);

	const onKeyDown = (e) => {
		if (e.keyCode === 13) {
			setSearch(e.target.value);
			window.history.pushState({}, '', `/?search=${e.target.value}`);
		}
	};
	const searchParam = React.useMemo(() => {
		return decodeURIComponent(window.location.search.replace('?search=', ''));
	}, []);

	const isTyping = React.useMemo(() => {
		return typed !== searchParam;
	}, [typed, searchParam]);

	React.useEffect(() => {
		if (searchParam !== '') {
			setSearch(searchParam);
			setTyped(searchParam);
		}
		window?.addEventListener('keydown', onKeyDown);
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
					onChange={onType}
				></input>
				<div className={isTyping ? '' : 'opacity-30'}>
					<MagnifyingGlass />
				</div>
			</header>
			<main>
				{search?.length <= MIN_SEARCH_LENGTH && (
					<ServerComponentShell fallback={<ArtistFeatureCardLoading />}>
						<ArtistFeatureCard hydrator={hydratorConstants.ArtistFeatureCardForSplashPage} />
					</ServerComponentShell>
				)}

				{search?.length > MIN_SEARCH_LENGTH && (
					<>
						<div className="grid-section-artist">
							<ServerComponentShell fallback={<ArtistFeatureCardLoading />}>
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
							<SongsListViewStateContainer {...{ search }} />
						</div>
					</>
				)}
			</main>
		</StyledContainer>
	);
};

export default MainLayout;
