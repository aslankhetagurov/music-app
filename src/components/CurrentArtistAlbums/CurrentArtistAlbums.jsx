import { useSelector } from 'react-redux';

import AlbumItem from '../AlbumItem/AlbumItem';
import { selectCurrentArtistAlbums } from '../CurrentArtist/store/currentArtistSlice';
import './CurrentArtistAlbums.scss';

const CurrentArtistAlbums = () => {
    const currentArtistAlbums = useSelector(selectCurrentArtistAlbums);

    return currentArtistAlbums ? (
        <div className="current-artist-albums">
            <h1 className="current-artist-albums__title">Albums</h1>
            <div className="current-artist-albums__items">
                {currentArtistAlbums.map((data) => {
                    return <AlbumItem key={data.album_id} albumData={data} />;
                })}
            </div>
        </div>
    ) : (
        <h3>no albums yet</h3>
    );
};

export default CurrentArtistAlbums;
