import {
    setAddCurrentSong,
    setTogglePlaying,
} from '../store/slices/generalStateSlice';

const handleSongPlay = (
    dispatch,
    songData,
    currentSongData,
    songId,
    handleAddCurrentList
) => {
    if (currentSongData?.song_id !== songId) {
        dispatch(setAddCurrentSong(songData));
        handleAddCurrentList && handleAddCurrentList();
    }
    if (currentSongData?.song_id === songId) {
        dispatch(setTogglePlaying());
    }
};

export default handleSongPlay;
