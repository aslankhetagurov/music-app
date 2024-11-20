import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import supabase from '../../../../supabaseClient';

const initialState = {
    recommendedSongsList: null,
    recommendedSongsListLoadingStatus: 'idle',
};

export const fetchRecommendedSongsList = createAsyncThunk(
    'recommendedSongsListSlice/fetchRecommendedSongsList',
    async (data, thunkAPI) => {
        try {
            //get a list of recommended songs based on your favorite genres
            const { data: recentlyPlayed, error: recentlyPlayedError } =
                await supabase
                    .from('recently_played')
                    .select('music(*,albums(*))')
                    .eq('user_id', data.userId)
                    .limit(100);

            if (recentlyPlayedError) {
                console.log(recentlyPlayedError);
                return;
            }

            if (recentlyPlayed.length) {
                // We form a list of favorite genres based on the songs we listen to
                const favoriteGenres = Object.entries(
                    recentlyPlayed
                        .map((obj) => ({
                            ...obj.music,
                        })) // remove unnecessary data from the array
                        .reduce((acc, item) => {
                            acc[item.genre] =
                                item.genre in acc ? acc[item.genre] + 1 : 1;

                            return acc;
                        }, {}) // counted the number of songs of a certain genre listened to in the list
                )
                    .sort((a, b) => b[1] - a[1]) //sort by frequency of listening genre
                    .slice(0, 3) //left the three most popular genres
                    .map((item) => item[0]); //formed an array of favorite genres

                if (favoriteGenres) {
                    let { data: recommendSongs, error: recommendSongsError } =
                        await supabase
                            .from('music')
                            .select('*, albums(*)')
                            .in('genre', favoriteGenres)
                            .limit(data.limit);

                    if (recommendSongsError) {
                        console.log(recommendSongsError);
                        return;
                    }

                    if (recommendSongs) {
                        return recommendSongs;
                    }
                }
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);

            return thunkAPI.rejectWithValue(error);
        }
    }
);

const recommendedSongsListSlice = createSlice({
    name: 'recommendedSongsList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchRecommendedSongsList.pending, (state) => {
            state.recommendedSongsListLoadingStatus = 'loading';
        });

        builder.addCase(
            fetchRecommendedSongsList.fulfilled,
            (state, action) => {
                if (action.payload) {
                    state.recommendedSongsListLoadingStatus = 'idle';
                    state.recommendedSongsList = action.payload;
                } else {
                    state.recommendedSongsListLoadingStatus = 'error';
                }
            }
        );

        builder.addCase(fetchRecommendedSongsList.rejected, (state) => {
            state.recommendedSongsListLoadingStatus = 'error';
        });

        builder.addDefaultCase(() => {});
    },
});

export const selectRecommendedSongsList = (state) =>
    state.recommendedSongsList.recommendedSongsList;
export const selectRecommendedSongsListLoadingStatus = (state) =>
    state.recommendedSongsList.recommendedSongsListLoadingStatus;

export default recommendedSongsListSlice.reducer;
