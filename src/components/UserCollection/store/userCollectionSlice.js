import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { setAddAlertText, setAddAlertType } from '../../Alert/store/alertSlice';
import supabase from '../../../../supabaseClient';

const initialState = {
    favoriteSongs: [],
    favoriteArtists: [],
    favoriteAlbums: [],
    userCollectionLoadingStatus: 'idle',
};

export const fetchUserCollection = createAsyncThunk(
    'userCollection/fetchUserCollection',
    async (userEmail, thunkAPI) => {
        try {
            const { data: favoriteSongs, error: favoriteSongsError } =
                await supabase
                    .from('favorite_songs')
                    .select('music(*, albums(*))')
                    .eq('user_email', userEmail);

            const { data: favoriteArtists, error: favoriteArtistsError } =
                await supabase
                    .from('favorite_artists')
                    .select('artists(*)')
                    .eq('user_email', userEmail);

            const { data: favoriteAlbums, error: favoriteAlbumsError } =
                await supabase
                    .from('favorite_albums')
                    .select('albums(*)')
                    .eq('user_email', userEmail);

            if (favoriteSongsError || favoriteArtistsError) {
                thunkAPI.dispatch(
                    setAddAlertText(
                        `${favoriteSongsError?.message || ''}; 
                            ${favoriteArtistsError?.message || ''};
                            ${favoriteAlbumsError?.message || ''}`
                    )
                );
                thunkAPI.dispatch(setAddAlertType('error'));
            }

            return { favoriteSongs, favoriteArtists, favoriteAlbums };
        } catch (error) {
            thunkAPI.dispatch(setAddAlertText(error.message));
            thunkAPI.dispatch(setAddAlertType('error'));

            return thunkAPI.rejectWithValue(error);
        }
    }
);

const userCollectionSlice = createSlice({
    name: 'userCollection',
    initialState,
    reducers: {
        setAddFavoriteSongs: (state, action) => {
            state.favoriteSongs.unshift(action.payload);
        },
        setAddFavoriteArtist: (state, action) => {
            state.favoriteArtists.unshift(action.payload);
        },
        setAddFavoriteAlbum: (state, action) => {
            state.favoriteAlbums.unshift(action.payload);
        },
        setDeleteFavoriteSong: (state, action) => {
            state.favoriteSongs = state.favoriteSongs.filter(
                (song) => song.song_id !== action.payload
            );
        },
        setDeleteFavoriteArtist: (state, action) => {
            state.favoriteArtists = state.favoriteArtists.filter(
                (artist) => artist.artist_id !== action.payload
            );
        },
        setDeleteFavoriteAlbum: (state, action) => {
            state.favoriteAlbums = state.favoriteAlbums.filter(
                (album) => album.album_id !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserCollection.pending, (state) => {
            state.userCollectionLoadingStatus = 'loading';
        });
        builder.addCase(fetchUserCollection.fulfilled, (state, action) => {
            if (action.payload) {
                state.userCollectionLoadingStatus = 'idle';

                state.favoriteSongs = action.payload.favoriteSongs
                    .map((obj) => ({
                        ...obj.music,
                    }))
                    .reverse();

                state.favoriteArtists = action.payload.favoriteArtists
                    .map((obj) => ({
                        ...obj.artists,
                    }))
                    .reverse();
                state.favoriteAlbums = action.payload.favoriteAlbums
                    .map((obj) => ({
                        ...obj.albums,
                    }))
                    .reverse();
            } else {
                state.userCollectionLoadingStatus = 'error';
            }
        });
        builder.addCase(fetchUserCollection.rejected, (state) => {
            state.userCollectionLoadingStatus = 'error';
        });
    },
});

const { reducer, actions } = userCollectionSlice;

export const {
    setAddFavoriteSongs,
    setDeleteFavoriteSong,
    setAddFavoriteArtist,
    setDeleteFavoriteArtist,
    setAddFavoriteAlbum,
    setDeleteFavoriteAlbum,
} = actions;

export const selectFavoriteSongs = (state) =>
    state.userCollection.favoriteSongs;
export const selectFavoriteArtists = (state) =>
    state.userCollection.favoriteArtists;
export const selectFavoriteAlbums = (state) =>
    state.userCollection.favoriteAlbums;
export const selectUserCollectionLoadingStatus = (state) =>
    state.userCollection.userCollectionLoadingStatus;

export default reducer;
