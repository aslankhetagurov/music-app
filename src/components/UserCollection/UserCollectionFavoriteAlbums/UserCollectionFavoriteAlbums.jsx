import { useSelector } from 'react-redux';

import AlbumItem from '../../AlbumItem/AlbumItem';
import { selectFavoriteAlbums } from '../store/userCollectionSlice';
import './UserCollectionFavoriteAlbums.scss';

const UserCollectionFavoriteAlbums = () => {
    const favoriteAlbums = useSelector(selectFavoriteAlbums);

    return (
        <div className="favorite-albums">
            {favoriteAlbums.length ? (
                <>
                    <h2 className="favorite-albums__title">Favorite Albums</h2>
                    <div className="favorite-albums__items">
                        {favoriteAlbums.map((data) => {
                            return (
                                <AlbumItem
                                    key={data.album_id}
                                    albumData={data}
                                />
                            );
                        })}
                    </div>
                </>
            ) : (
                <h3>No favorite albums added yet</h3>
            )}
        </div>
    );
};

export default UserCollectionFavoriteAlbums;
