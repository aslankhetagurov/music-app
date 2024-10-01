import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

import addOrDeleteFavoriteItem from '../../utils/addOrDeleteFavoriteItem';
import { selectUserInfo } from '../../store/slices/authSlice';
import {
    selectFavoriteArtists,
    selectFavoriteSongs,
} from '../UserCollection/store/userCollectionSlice';
import './LikeBtn.scss';

const LikeBtn = ({ data, itemType }) => {
    const userInfo = useSelector(selectUserInfo);
    const favoriteSongs = useSelector(selectFavoriteSongs);
    const favoriteArtists = useSelector(selectFavoriteArtists);
    const isFavorite =
        itemType === 'song'
            ? favoriteSongs?.some((song) => song.song_id === data.song_id)
            : favoriteArtists?.some(
                  (artist) => artist.artist_id === data?.artist_id
              );

    return (
        <button
            className="like-btn"
            onClick={() =>
                addOrDeleteFavoriteItem(isFavorite, data, userInfo, itemType)
            }
        >
            {isFavorite ? (
                <FaHeart style={{ color: 'rgb(255 99 99)' }} />
            ) : (
                <FaRegHeart />
            )}
        </button>
    );
};

export default LikeBtn;
