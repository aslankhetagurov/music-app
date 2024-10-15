import {
    setAddSidebarInfoType,
    setAddSidebarList,
} from '../components/Sidebar/store/sidebarSlice';
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
        dispatch(setAddSidebarInfoType('Song'));
        dispatch(setAddSidebarList(null));
        handleAddCurrentList && handleAddCurrentList();
    }
    if (currentSongData?.song_id === songId) {
        dispatch(setTogglePlaying());
    }
};

export default handleSongPlay;
