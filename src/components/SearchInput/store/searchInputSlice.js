import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { setAddAlertText, setAddAlertType } from '../../Alert/store/alertSlice';
import supabase from '../../../../supabaseClient';

const initialState = {
    searchValue: '',
    searchArtistsList: null,
    searchSongsList: null,
    searchAlbumsList: null,
    searchDataLoadingStatus: null,
};

export const fetchSearchLists = createAsyncThunk(
    'searchInput/fetchSearchLists',
    async (searchValue, thunkApi) => {
        try {
            if (searchValue) {
                const { data: searchArtistsList, error: artistsError } =
                    await supabase
                        .from('artists')
                        .select('*, music(*)')
                        .ilike('name', `%${searchValue}%`)
                        .range(0, 9);

                const { data: searchSongsList, error: musicError } =
                    await supabase
                        .from('music')
                        .select()
                        .ilike('name', `%${searchValue}%`)
                        .range(0, 9);

                const { data: searchAlbumsList, error: albumsError } =
                    await supabase
                        .from('albums')
                        .select('*, music(*)')
                        .ilike('name', `%${searchValue}%`)
                        .range(0, 9);

                if (artistsError || musicError || albumsError) {
                    thunkApi.dispatch(
                        setAddAlertText(
                            `${artistsError?.message || ''}; 
                            ${musicError?.message || ''}
                            ${albumsError?.message || ''}`
                        )
                    );
                    thunkApi.dispatch(setAddAlertType('error'));
                }

                return { searchArtistsList, searchSongsList, searchAlbumsList };
            }
        } catch (error) {
            thunkApi.dispatch(setAddAlertText(error.message));
            thunkApi.dispatch(setAddAlertType('error'));

            return thunkApi.rejectWithValue(error);
        }
    }
);

const searchInputSlice = createSlice({
    name: 'searchInput',
    initialState,
    reducers: {
        setAddSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        setAddSearchArtistsList: (state, action) => {
            state.searchArtistsList = action.payload;
        },
        setAddSearchSongsList: (state, action) => {
            state.searchSongsList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchLists.pending, (state) => {
            state.searchDataLoadingStatus = 'loading';
        });

        builder.addCase(fetchSearchLists.fulfilled, (state, action) => {
            if (action.payload) {
                state.searchDataLoadingStatus = 'idle';
                state.searchArtistsList = action.payload.searchArtistsList;
                state.searchSongsList = action.payload.searchSongsList;
                state.searchAlbumsList = action.payload.searchAlbumsList;
            } else {
                state.searchDataLoadingStatus = 'error';
            }
        });

        builder.addCase(fetchSearchLists.rejected, (state) => {
            state.searchDataLoadingStatus = 'error';
        });
    },
});

const { reducer, actions } = searchInputSlice;

export const {
    setAddSearchValue,
    setAddSearchArtistsList,
    setAddSearchSongsList,
} = actions;

export const selectSearchValue = (state) => state.searchInput.searchValue;
export const selectSearchArtistsList = (state) =>
    state.searchInput.searchArtistsList;
export const selectSearchSongsList = (state) =>
    state.searchInput.searchSongsList;
export const selectSearchAlbumsList = (state) =>
    state.searchInput.searchAlbumsList;
export const selectDataLoadingStatus = (state) =>
    state.searchInput.searchDataLoadingStatus;

export default reducer;
