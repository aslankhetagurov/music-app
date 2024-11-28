import { configureStore } from '@reduxjs/toolkit';

import popularSongs from '../components/PopularSongsList/store/popularSongsSlice';
import generalState from './slices/generalStateSlice';
import popularArtists from '../components/PopularArtistsList/store/popularArtistsSlice';
import currentArtist from '../components/CurrentArtist/store/currentArtistSlice';
import sidebar from '../components/Sidebar/store/sidebarSlice';
import auth from './slices/authSlice';
import alert from '../components/Alert/store/alertSlice';
import recentlyPlayed from '../components/RecentlyPlayedList/store/recentlyPlayedSlice';
import searchInput from '../components/SearchInput/store/searchInputSlice';
import userCollection from '../components/UserCollection/store/userCollectionSlice';
import popularAlbums from '../components/PopularAlbumsList/store/popularAlbumsListSlice';
import singleAlbum from '../pages/SingleAlbumPage/store/singleAlbumSlice';
import playbackQueuePopup from '../components/PlaybackQueuePopup/store/playbackQueuePopupSlice';
import singleSong from '../components/SingleSong/store/singleSongSlice';
import newReleasesList from '../components/NewReleasesList/store/newReleasesListSlice';
import recommendedSongsList from '../components/RecommendedSongsList/store/recommendedSongsListSlice';
import chart from '../components/Chart/store/chartSlice';

const store = configureStore({
    reducer: {
        popularSongs,
        generalState,
        popularArtists,
        currentArtist,
        sidebar,
        auth,
        alert,
        recentlyPlayed,
        searchInput,
        userCollection,
        popularAlbums,
        singleAlbum,
        playbackQueuePopup,
        singleSong,
        newReleasesList,
        recommendedSongsList,
        chart,
    },
});

export default store;
