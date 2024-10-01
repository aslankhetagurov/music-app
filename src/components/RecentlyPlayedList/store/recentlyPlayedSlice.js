import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import supabase from '../../../../supabaseClient';
import { setAddAlertText, setAddAlertType } from '../../Alert/store/alertSlice';

const initialState = {
    recentlyPlayed: [],
    recentlyPlayedLoadingStatus: 'idle',
};

export const fetchRecentlyPlayed = createAsyncThunk(
    'recentlyPlayed/fetchRecentlyPlayed',
    async (data, thunkAPI) => {
        try {
            const { data: recentlyPlayed, error } = await supabase
                .from('recently_played')
                .select('music(*)')
                .eq('user_id', data.userId)
                .range(0, data.limit);

            if (error) {
                thunkAPI.dispatch(setAddAlertText(error.message));
                thunkAPI.dispatch(setAddAlertType('error'));
            }

            return recentlyPlayed;
        } catch (error) {
            thunkAPI.dispatch(setAddAlertText(error.message));
            thunkAPI.dispatch(setAddAlertType('error'));

            return thunkAPI.rejectWithValue(error);
        }
    }
);

const recentlyPlayedSlice = createSlice({
    name: 'recentlyPlayed',
    initialState,
    reducers: {
        setAddRecentlyPlayed: (state, action) => {
            state.recentlyPlayed = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRecentlyPlayed.pending, (state) => {
            state.recentlyPlayedLoadingStatus = 'loading';
        });

        builder.addCase(fetchRecentlyPlayed.fulfilled, (state, action) => {
            if (action.payload) {
                state.recentlyPlayed = action.payload
                    .map((obj) => ({
                        ...obj.music,
                    }))
                    .reverse();
                state.recentlyPlayedLoadingStatus = 'idle';
            } else {
                state.recentlyPlayedLoadingStatus = 'error';
            }
        });

        builder.addCase(fetchRecentlyPlayed.rejected, (state) => {
            state.recentlyPlayedLoadingStatus = 'error';
        });

        builder.addDefaultCase(() => {});
    },
});

const { reducer, actions } = recentlyPlayedSlice;

export const { setAddRecentlyPlayed } = actions;

export const selectRecentlyPlayed = (state) =>
    state.recentlyPlayed.recentlyPlayed;
export const selectRecentlyPlayedLoadingStatus = (state) =>
    state.recentlyPlayed.recentlyPlayedLoadingStatus;

export default reducer;
