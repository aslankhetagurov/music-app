import { configureStore } from '@reduxjs/toolkit';

import popularSongs from '../components/PopularSongsList/store/popularSongsSlice';
import generalState from './slices/generalStateSlice';
import popularArtists from '../components/PopularArtistsList/store/popularArtistsSlice';
import currentArtist from '../components/CurrentArtist/store/currentArtistSlice';

const store = configureStore({
    reducer: {
        popularSongs,
        generalState,
        popularArtists,
        currentArtist,
    },
});

export default store;
