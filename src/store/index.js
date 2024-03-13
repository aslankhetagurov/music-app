import { configureStore } from '@reduxjs/toolkit';

import popularSongs from '../components/PopularSongsList/store/popularSongsSlice';

const store = configureStore({
    reducer: {
        popularSongs,
    },
});

export default store;
