// @ts-nocheck
import React from 'react';
import SongsView from './serverComponents/SongsView.jsx';
import ArtistView from './serverComponents/ArtistView.jsx';
import ServerComponentShell from './ServerComponentShell.jsx';
import { StyledContainer } from './styleSheet.jsx';
import { MagnifyingGlass, RandomIcon } from './components.jsx';
import ArtistCard from './serverComponents/ArtistCard.jsx';
import { MIN_SEARCH_LENGTH } from '../constants.js';

const MainLayout = () => {
	const [search, setSearch] = React.useState('');
	const inputRef = React.useRef(null);
	const [isPending, startTransition] = React.useTransition();

	const onLogoClick = React.useCallback(() => {
		setSearch('');
		if (inputRef?.current?.value) {
			inputRef.current.value = '';
		}
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
					placeholder="Search for Artist"
					onChange={(e) =>
						startTransition(() => {
							!isPending && setSearch(e.target.value);
						})
					}
				></input>
				<MagnifyingGlass />
				<RandomIcon />
			</header>
			<main>
				{search?.length <= MIN_SEARCH_LENGTH && (
					<ServerComponentShell>
						<ArtistCard />
					</ServerComponentShell>
				)}
				<ServerComponentShell>
					<ArtistView {...{ search, source: 'genius' }} />
				</ServerComponentShell>
				<ServerComponentShell>
					<ArtistView {...{ search, source: 'discogs' }} />
				</ServerComponentShell>
				<ServerComponentShell>
					<SongsView {...{ search }} />
				</ServerComponentShell>
			</main>
		</StyledContainer>
	);
};

export default MainLayout;
