import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';

import addOrDeleteFavoriteItem from '../../utils/addOrDeleteFavoriteItem';
import { selectUserInfo } from '../../store/slices/authSlice';
import {
    selectFavoriteAlbums,
    selectFavoriteArtists,
    selectFavoriteSongs,
} from '../UserCollection/store/userCollectionSlice';
import './LikeBtn.scss';

const LikeBtn = ({ data, itemType }) => {
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const favoriteSongs = useSelector(selectFavoriteSongs);
    const favoriteArtists = useSelector(selectFavoriteArtists);
    const favoriteAlbums = useSelector(selectFavoriteAlbums);
    const isFavorite =
        itemType === 'song'
            ? favoriteSongs?.some((song) => song.song_id === data.song_id)
            : itemType === 'artist'
            ? favoriteArtists?.some(
                  (artist) => artist.artist_id === data?.artist_id
              )
            : favoriteAlbums?.some(
                  (album) => album.album_id === data?.album_id
              );

    return (
        <button
            className="like-btn"
            title={
                isFavorite
                    ? `Remove this ${itemType} from the Collection`
                    : `Add this ${itemType} to the Collection`
            }
            onClick={() =>
                addOrDeleteFavoriteItem(
                    dispatch,
                    isFavorite,
                    data,
                    userInfo,
                    itemType
                )
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
