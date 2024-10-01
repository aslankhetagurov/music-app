import { useSelector } from 'react-redux';

import { selectCurrentSongsList } from '../../../store/slices/generalStateSlice';
import LineSongItem from '../../LineSongItem/LineSongItem';
import {
    selectFavoriteSongs,
    selectUserCollectionLoadingStatus,
} from '../store/userCollectionSlice';
import handleAddCurrentSongsList from '../../../utils/handleAddCurrentSongsList';
import { ImSpinner2 } from 'react-icons/im';
import './UserCollectionFavoriteSongs.scss';

const UserCollectionFavoriteSongs = () => {
    const currentSongslist = useSelector(selectCurrentSongsList);
    const favoriteSongs = useSelector(selectFavoriteSongs);
    const userCollectionLoadingStatus = useSelector(
        selectUserCollectionLoadingStatus
    );

    const renderItems = () => {
        if (!favoriteSongs.length) {
            return <h3>No favorite songs added yet</h3>;
        }
        return (
            <div className="favorite-songs">
                <h1 className="favorite-songs__title">Favorite Songs</h1>
                <div className="favorite-songs__list">
                    {favoriteSongs.map((data, i) => {
                        return (
                            <LineSongItem
                                key={data.song_id}
                                songData={data}
                                handleAddCurrentList={() =>
                                    handleAddCurrentSongsList(
                                        currentSongslist,
                                        favoriteSongs
                                    )
                                }
                                songNum={i + 1}
                            />
                        );
                    })}
                </div>
            </div>
        );
    };

    return userCollectionLoadingStatus === 'loading' ? (
        <ImSpinner2 className="spinner" />
    ) : userCollectionLoadingStatus === 'error' ? (
        <h1>An has occurred, reload the page...</h1>
    ) : (
        renderItems()
    );
};

export default UserCollectionFavoriteSongs;
