import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import supabase from '../../../../supabaseClient';
import { setAddAlertText, setAddAlertType } from '../../Alert/store/alertSlice';

const initialState = {
    singleSongData: null,
    singleSongDataLoadingStatus: 'idle',
};

export const fetchSingleSong = createAsyncThunk(
    'singleSong/fetchSingleSong',
    async (songId, thunkAPI) => {
        try {
            let { data: singleAlbumData, error } = await supabase
                .from('music')
                .select()
                .eq('id', songId);

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

const singleSongSlice = createSlice({
    name: 'singleSong',
    initialState,
    reducers: {
        setAddSingleSongData: (state, action) => {
            state.singleSongData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSingleSong.pending, (state) => {
            state.singleSongDataLoadingStatus = 'loading';
        });

        builder.addCase(fetchSingleSong.fulfilled, (state, action) => {
            if (action.payload) {
                state.singleSongDataLoadingStatus = 'idle';

                state.singleSongData = action.payload[0];
            } else {
                state.singleSongDataLoadingStatus = 'error';
            }
        });

        builder.addCase(fetchSingleSong.rejected, (state) => {
            state.singleSongDataLoadingStatus = 'error';
        });

        builder.addDefaultCase(() => {});
    },
});

const { reducer, actions } = singleSongSlice;

export const { setAddSingleSongData } = actions;

export const selectSingleSongData = (state) => state.singleSong.singleSongData;
export const selectSingleSongDataLoadingStatus = (state) =>
    state.singleSong.singleSongDataLoadingStatus;

export default reducer;
