import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

import addOrDeleteFavoriteSong from '../../utils/addOrDeleteFavoriteSong';
import { selectUserInfo } from '../../store/slices/authSlice';
import { selectFavoriteSongs } from '../UserCollection/store/userCollectionSlice';
import './LikeBtn.scss';

const LikeBtn = ({ songData }) => {
    const userInfo = useSelector(selectUserInfo);
    const favoriteSongs = useSelector(selectFavoriteSongs);
    const isFavoriteSong = favoriteSongs?.some(
        (song) => song.song_id === songData.song_id
    );

    return (
        <button
            className="like-btn"
            onClick={() =>
                addOrDeleteFavoriteSong(isFavoriteSong, songData, userInfo)
            }
        >
            {isFavoriteSong ? <FaHeart /> : <FaRegHeart />}
        </button>
    );
};

export default LikeBtn;
