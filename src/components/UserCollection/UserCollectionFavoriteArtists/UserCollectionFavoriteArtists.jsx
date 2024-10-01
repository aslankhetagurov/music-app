import { useSelector } from 'react-redux';
import { ImSpinner2 } from 'react-icons/im';

import {
    selectFavoriteArtists,
    selectUserCollectionLoadingStatus,
} from '../store/userCollectionSlice';
import ArtistItem from '../../ArtistItem/ArtistItem';
import './UserCollectionFavoriteArtists.scss';

const UserCollectionFavoriteArtists = () => {
    const favoriteArtists = useSelector(selectFavoriteArtists);
    const userCollectionLoadinStatus = useSelector(
        selectUserCollectionLoadingStatus
    );

    const renderItems = favoriteArtists.map((data) => {
        return <ArtistItem key={data.artist_id} artistData={data} />;
    });

    return (
        <div className="favorite-artists">
            <h1 className="favorite-artists__title">Favorite Artists</h1>

            {userCollectionLoadinStatus === 'loading' ? (
                <ImSpinner2 className="spinner" />
            ) : userCollectionLoadinStatus === 'error' ? (
                'An error has occurred, reload the page...'
            ) : (
                <div className="favorite-artists__list">{renderItems}</div>
            )}
        </div>
    );
};

export default UserCollectionFavoriteArtists;
