import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentSong: null,
    playing: false,
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
    },
});

const { reducer, actions } = generalStateSlice;

export const { setTogglePlaying, setAddCurrentSong } = actions;

export const selectPlaying = (state) => state.generalState.playing;
export const selectCurrentSong = (state) => state.generalState.currentSong;

export default reducer;
