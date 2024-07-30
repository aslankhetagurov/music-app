import { setAddCurrentSongsList } from '../store/slices/generalStateSlice';
import store from '../store';

const handleAddCurrentSongsList = (currentSongslist, newCurrentSongslist) => {
    if (currentSongslist) {
        const res = Object.is(currentSongslist, newCurrentSongslist);
        !res && store.dispatch(setAddCurrentSongsList(newCurrentSongslist));
    } else {
        store.dispatch(setAddCurrentSongsList(newCurrentSongslist));
    }
};

export default handleAddCurrentSongsList;
