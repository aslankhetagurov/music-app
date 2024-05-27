import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentSong: null,
    playing: false,
    repeating: false,
};

const generalStateSlice = createSlice({
    name: 'generalState',
    initialState,
    reducers: {
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

export const { setTogglePlaying, setAddCurrentSong, setToggleRepeating } =
    actions;

export const selectPlaying = (state) => state.generalState.playing;
export const selectCurrentSong = (state) => state.generalState.currentSong;
export const selectRepeating = (state) => state.generalState.repeating;

export default reducer;
