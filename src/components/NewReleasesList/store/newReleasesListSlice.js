import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { setAddAlertText, setAddAlertType } from '../../Alert/store/alertSlice';
import supabase from '../../../../supabaseClient';

const initialState = {
    newReleasesList: null,
    newReleasesListLoadingStatus: 'idle',
};

export const fetchNewReleasesList = createAsyncThunk(
    'newReleasesList/fetchNewReleasesList',
    async (limit, thunkAPI) => {
        try {
            let { data: newReleases, error } = await supabase
                .from('music')
                .select('*, albums(*)')
                .order('date', { ascending: false })
                .limit(limit);

            if (error) {
                thunkAPI.dispatch(setAddAlertText(error.message));
                thunkAPI.dispatch(setAddAlertType('error'));
            }

            return newReleases;
        } catch (error) {
            thunkAPI.dispatch(setAddAlertText(error.message));
            thunkAPI.dispatch(setAddAlertType('error'));

            return thunkAPI.rejectWithValue(error);
        }
    }
);

const newReleasesListSlice = createSlice({
    name: 'newReleasesList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchNewReleasesList.pending, (state) => {
            state.newReleasesListLoadingStatus = 'loading';
        });

        builder.addCase(fetchNewReleasesList.fulfilled, (state, action) => {
            if (action.payload) {
                state.newReleasesListLoadingStatus = 'idle';
                state.newReleasesList = action.payload;
            } else {
                state.newReleasesListLoadingStatus = 'error';
            }
        });

        builder.addCase(fetchNewReleasesList.rejected, (state) => {
            state.newReleasesListLoadingStatus = 'error';
        });
        builder.addDefaultCase(() => {});
    },
});

export const selectNewReleasesList = (state) =>
    state.newReleasesList.newReleasesList;
export const selectNewReleasesListLoadingStatus = (state) =>
    state.newReleasesList.newReleasesListLoadingStatus;

export default newReleasesListSlice.reducer;
