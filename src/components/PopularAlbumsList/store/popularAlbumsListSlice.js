import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { setAddAlertText, setAddAlertType } from '../../Alert/store/alertSlice';
import supabase from '../../../../supabaseClient';

const initialState = {
    popularAlbums: null,
    popularAlbumsLoadingStatus: 'idle',
};

export const fetchPopularAlbums = createAsyncThunk(
    'popularAlbums/fetchPopularAlbums',
    async (_, thunkAPI) => {
        try {
            let { data: popularAlbums, error } = await supabase
                .from('albums')
                .select('*')
                .order('rating', { ascending: false });

            if (error) {
                thunkAPI.dispatch(setAddAlertText(error.message));
                thunkAPI.dispatch(setAddAlertType('error'));
            }

            return popularAlbums;
        } catch (error) {
            thunkAPI.dispatch(setAddAlertText(error.message));
            thunkAPI.dispatch(setAddAlertType('error'));

            return thunkAPI.rejectWithValue(error);
        }
    }
);

const popularAlbumsSlice = createSlice({
    name: 'popularAlbums',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPopularAlbums.pending, (state) => {
            state.popularAlbumsLoadingStatus = 'loading';
        });

        builder.addCase(fetchPopularAlbums.fulfilled, (state, action) => {
            if (action.payload) {
                state.popularAlbumsLoadingStatus = 'idle';
                state.popularAlbums = action.payload;
            } else {
                state.popularAlbumsLoadingStatus = 'error';
            }
        });

        builder.addCase(fetchPopularAlbums.rejected, (state) => {
            state.popularAlbumsLoadingStatus = 'error';
        });

        builder.addDefaultCase(() => {});
    },
});

export const selectPopularAlbums = (state) => state.popularAlbums.popularAlbums;
export const selectPopularAlbumsLoadingStatus = (state) =>
    state.popularAlbums.popularAlbumsLoadingStatus;

export default popularAlbumsSlice.reducer;
