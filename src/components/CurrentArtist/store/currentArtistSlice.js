import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import supabase from '../../../../supabaseClient';

const initialState = {
    currentArtistInfo: null,
    currentArtistSongs: null,
    currentArtistLoadingStatus: 'idle',
};

export const fetchCurrentArtist = createAsyncThunk(
    'currentArtist/fetchCurrentArtist',
    async (artistName, thunkApi) => {
        try {
            const { data: currentArtistInfo } = await supabase
                .from('artists')
                .select()
                .eq('name', artistName);

            const { data: currentArtistSongs } = await supabase
                .from('music')
                .select()
                .eq('artist', artistName);

            return { currentArtistInfo, currentArtistSongs };
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
            if (action.payload) {
                state.currentArtistLoadingStatus = 'idle';
                state.currentArtistInfo = action.payload.currentArtistInfo;
                state.currentArtistSongs = action.payload.currentArtistSongs;
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
export const selectCurrentArtistLoadingStatus = (state) =>
    state.currentArtist.currentArtistLoadingStatus;

export default currentArtistSlice.reducer;
