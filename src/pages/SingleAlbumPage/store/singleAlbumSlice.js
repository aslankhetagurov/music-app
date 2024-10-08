import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import supabase from '../../../../supabaseClient';
import {
    setAddAlertText,
    setAddAlertType,
} from '../../../components/Alert/store/alertSlice';

const initialState = {
    singleAlbumInfo: null,
    singleAlbumSongs: null,
    singleAlbumLoadingStatus: 'idle',
};

export const fetchSingleAlbum = createAsyncThunk(
    'singleAlbum/fetchSingleAlbum',
    async (albumId, thunkAPI) => {
        try {
            let { data: singleAlbumData, error } = await supabase
                .from('albums')
                .select(
                    `
                        *,
                        music (
                        *,albums(*)
                        )
                    `
                )
                .eq('id', albumId);

            if (error) {
                thunkAPI.dispatch(setAddAlertText(error.message));
                thunkAPI.dispatch(setAddAlertType('error'));
            } else {
                return singleAlbumData;
            }
        } catch (error) {
            if (error) {
                thunkAPI.dispatch(setAddAlertText(error.message));
                thunkAPI.dispatch(setAddAlertType('error'));
            }
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const singleAlbumSlice = createSlice({
    name: 'singleAlbum',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchSingleAlbum.pending, (state) => {
            state.singleAlbumLoadingStatus = 'loading';
        });

        builder.addCase(fetchSingleAlbum.fulfilled, (state, action) => {
            if (action.payload) {
                state.singleAlbumLoadingStatus = 'idle';

                const { music, ...albumInfo } = action.payload[0];
                state.singleAlbumInfo = albumInfo;
                state.singleAlbumSongs = music;
            } else {
                state.singleAlbumLoadingStatus = 'error';
            }
        });

        builder.addCase(fetchSingleAlbum.rejected, (state) => {
            state.singleAlbumLoadingStatus = 'error';
        });

        builder.addDefaultCase(() => {});
    },
});

export const selectSingleAlbumInfo = (state) =>
    state.singleAlbum.singleAlbumInfo;
export const selectSingleAlbumSongs = (state) =>
    state.singleAlbum.singleAlbumSongs;
export const selectSingleAlbumLoadingStatus = (state) =>
    state.singleAlbum.singleAlbumLoadingStatus;

export default singleAlbumSlice.reducer;
