import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showPlaybackQueuePopup: false,
};

const playbackQueuePopupSlice = createSlice({
    name: 'playbackQueuePopup',
    initialState,
    reducers: {
        setShowPlaybackQueuePopup: (state) => {
            state.showPlaybackQueuePopup = !state.showPlaybackQueuePopup;
        },
    },
});

export const setShowPlaybackQueuePopup =
    playbackQueuePopupSlice.actions.setShowPlaybackQueuePopup;

export const selectShowPlaybackQueuePopup = (state) =>
    state.playbackQueuePopup.showPlaybackQueuePopup;

export default playbackQueuePopupSlice.reducer;
