import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import supabase from '../../../../supabaseClient';

const initialState = {
    popularSongs: [],
    popularSongsLoadingStatus: 'idle',
};

export const fetchPopularSongs = createAsyncThunk(
    'popularSongs/fetchPopularSongs',
    async (limit, thunkAPI) => {
        try {
            const { data } = await supabase
                .from('music')
                .select('*, albums(*)')
                .order('likes', { ascending: false })
                .limit(limit);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const popularSongsSlice = createSlice({
    name: 'popularSongs',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPopularSongs.pending, (state) => {
            state.popularSongsLoadingStatus = 'loading';
        });

        builder.addCase(fetchPopularSongs.fulfilled, (state, action) => {
            if (action.payload) {
                state.popularSongsLoadingStatus = 'idle';
                state.popularSongs = action.payload;
            } else {
                state.popularSongsLoadingStatus = 'error';
            }
        });

        builder.addCase(fetchPopularSongs.rejected, (state) => {
            state.popularSongsLoadingStatus = 'error';
        });
        builder.addDefaultCase(() => {});
    },
});

export const selectPopularSongs = (state) => state.popularSongs.popularSongs;
export const selectPopularSongsLoadingStatus = (state) =>
    state.popularSongs.popularSongsLoadingStatus;

export default popularSongsSlice.reducer;
