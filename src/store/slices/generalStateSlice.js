import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentSongsList: null,
    currentSong: null,
    playing: false,
    repeating: false,
};

const generalStateSlice = createSlice({
    name: 'generalState',
    initialState,
    reducers: {
        setAddCurrentSongsList: (state, action) => {
            state.currentSongsList = action.payload;
        },
        setAddCurrentSong: (state, action) => {
            state.currentSong = action.payload;
        },
        setTogglePlaying: (state) => {
            state.playing = !state.playing;
        },
        setToggleRepeating: (state) => {
            state.repeating = !state.repeating;
        },
    },
});

const { reducer, actions } = generalStateSlice;

export const {
    setTogglePlaying,
    setAddCurrentSong,
    setToggleRepeating,
    setAddCurrentSongsList,
} = actions;

export const selectCurrentSongsList = (state) =>
    state.generalState.currentSongsList;
export const selectCurrentSong = (state) => state.generalState.currentSong;
export const selectPlaying = (state) => state.generalState.playing;
export const selectRepeating = (state) => state.generalState.repeating;

export default reducer;
