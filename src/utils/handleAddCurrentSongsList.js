import { setAddCurrentSongsList } from '../store/slices/generalStateSlice';
import store from '../store';

const handleAddCurrentSongsList = (currentSongslist, newCurrentSongslist) => {
    if (currentSongslist !== newCurrentSongslist) {
        store.dispatch(setAddCurrentSongsList(newCurrentSongslist));
    }
};

export default handleAddCurrentSongsList;
