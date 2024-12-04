import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import supabase from '../../../../supabaseClient';

const initialState = {
    currentArtistInfo: null,
    currentArtistSongs: null,
    currentArtistAlbums: null,
    currentArtistLoadingStatus: 'idle',
};

export const fetchCurrentArtist = createAsyncThunk(
    'currentArtist/fetchCurrentArtist',
    async (artistName, thunkApi) => {
        try {
            const { data: currentArtistInfo } = await supabase
                .from('artists')
                .select('*, music(*,albums(*)), albums(*, music(*))')
                .eq('name', artistName);

            return currentArtistInfo;
        } catch (err) {
            return thunkApi.rejectWithValue(err);
        }
    }
);

const currentArtistSlice = createSlice({
    name: 'currentArtist',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentArtist.pending, (state) => {
            state.currentArtistInfo = initialState.currentArtistInfo;
            state.currentArtistSongs = initialState.currentArtistSongs;
            state.currentArtistLoadingStatus = 'loading';
        });
        builder.addCase(fetchCurrentArtist.fulfilled, (state, action) => {
            if (action.payload.length) {
                state.currentArtistLoadingStatus = 'idle';
                state.currentArtistInfo = action.payload;
                state.currentArtistSongs = action.payload[0].music;
                state.currentArtistAlbums = action.payload[0].albums;
            } else {
                state.currentArtistLoadingStatus = 'error';
            }
        });
        builder.addCase(fetchCurrentArtist.rejected, (state) => {
            state.currentArtistLoadingStatus = 'error';
        });
    },
});

export const selectCurrentArtistInfo = (state) =>
    state.currentArtist.currentArtistInfo;
export const selectCurrentArtistSongs = (state) =>
    state.currentArtist.currentArtistSongs;
export const selectCurrentArtistAlbums = (state) =>
    state.currentArtist.currentArtistAlbums;
export const selectCurrentArtistLoadingStatus = (state) =>
    state.currentArtist.currentArtistLoadingStatus;

export default currentArtistSlice.reducer;
