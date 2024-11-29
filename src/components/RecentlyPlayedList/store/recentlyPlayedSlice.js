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
                .select('music(*,albums(*))')
                .order('date', { ascending: false })
                .eq('user_id', data.userId)
                .limit(data.limit);

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

export const fetchClearListeningHistory = createAsyncThunk(
    'recentlyPlayed/fetchClearListeningHistory',
    async (userId, thunkAPI) => {
        try {
            const { error } = await supabase
                .from('recently_played')
                .delete()
                .eq('user_id', userId);

            if (error) {
                thunkAPI.dispatch(setAddAlertText(error.message));
                thunkAPI.dispatch(setAddAlertType('error'));
            }
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
    extraReducers: (builder) => {
        builder.addCase(fetchRecentlyPlayed.pending, (state) => {
            state.recentlyPlayedLoadingStatus = 'loading';
        });

        builder.addCase(fetchRecentlyPlayed.fulfilled, (state, action) => {
            if (action.payload) {
                state.recentlyPlayed = action.payload.map((obj) => ({
                    ...obj.music,
                }));
                state.recentlyPlayedLoadingStatus = 'idle';
            } else {
                state.recentlyPlayedLoadingStatus = 'error';
            }
        });

        builder.addCase(fetchRecentlyPlayed.rejected, (state) => {
            state.recentlyPlayedLoadingStatus = 'error';
        });

        builder.addCase(fetchClearListeningHistory.fulfilled, (state) => {
            state.recentlyPlayed = [];
        });

        builder.addCase(fetchClearListeningHistory.rejected, (state) => {
            state.recentlyPlayedLoadingStatus = 'error';
        });

        builder.addDefaultCase(() => {});
    },
});

export const selectRecentlyPlayed = (state) =>
    state.recentlyPlayed.recentlyPlayed;
export const selectRecentlyPlayedLoadingStatus = (state) =>
    state.recentlyPlayed.recentlyPlayedLoadingStatus;

export default recentlyPlayedSlice.reducer;
