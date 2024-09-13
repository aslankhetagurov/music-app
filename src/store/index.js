import { configureStore } from '@reduxjs/toolkit';

import popularSongs from '../components/PopularSongsList/store/popularSongsSlice';
import generalState from './slices/generalStateSlice';
import popularArtists from '../components/PopularArtistsList/store/popularArtistsSlice';
import currentArtist from '../components/CurrentArtist/store/currentArtistSlice';
import sidebar from '../components/Sidebar/store/sidebarSlice';
import auth from './slices/authSlice';
import alert from '../components/Alert/store/alertSlice';
import recentlyPlayed from '../components/RecentlyPlayedList/store/recentlyPlayedSlice';

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
    },
});

export default store;
