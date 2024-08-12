import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import supabase from '../../../../supabaseClient';

const initialState = {
    popularArtists: [],
    popularArtistsLoadingStatus: 'idle',
};

export const fetchPopularArtists = createAsyncThunk(
    'popularArtists/fetchPopularArtists',
    async (every, thunkApi) => {
        try {
            const { data: artists } = await supabase
                .from('artists')
                .select()
                .range(0, every ? 49 : 6);
            return artists;
        } catch (err) {
            return thunkApi.rejectWithValue(err);
        }
    }
);

const popularArtistsSlice = createSlice({
    name: 'popularArtists',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPopularArtists.pending, (state) => {
            state.popularArtistsLoadingStatus = 'loading';
        });

        builder.addCase(fetchPopularArtists.fulfilled, (state, action) => {
            if (action.payload) {
                state.popularArtistsLoadingStatus = 'idle';
                state.popularArtists = action.payload;
            } else {
                state.popularArtistsLoadingStatus = 'error';
            }
        });

        builder.addCase(fetchPopularArtists.rejected, (state) => {
            state.popularArtistsLoadingStatus = 'error';
        });
    },
});

export const selectPopularArtists = (state) =>
    state.popularArtists.popularArtists;
export const selectPopularArtistsLoadingStatus = (state) =>
    state.popularArtists.popularArtistsLoadingStatus;

export default popularArtistsSlice.reducer;
