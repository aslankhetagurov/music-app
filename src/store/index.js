import { configureStore } from '@reduxjs/toolkit';

import popularSongs from '../components/PopularSongsList/store/popularSongsSlice';
import generalState from './slices/generalStateSlice';
import popularArtists from '../components/PopularArtistsList/store/popularArtistsSlice';

const store = configureStore({
    reducer: {
        popularSongs,
        generalState,
        popularArtists,
    },
});

export default store;
