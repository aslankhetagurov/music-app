import { configureStore } from '@reduxjs/toolkit';

import popularSongs from '../components/PopularSongsList/store/popularSongsSlice';
import generalState from './slices/generalStateSlice';

const store = configureStore({
    reducer: {
        popularSongs,
        generalState,
    },
});

export default store;
