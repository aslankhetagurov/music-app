import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';

import {
    fetchPopularAlbums,
    selectPopularAlbums,
    selectPopularAlbumsLoadingStatus,
} from './store/popularAlbumsListSlice';
import AlbumItem from '../AlbumItem/AlbumItem';
import './PopularAlbumsList.scss';

const PopularAlbumsList = () => {
    const popularAlbums = useSelector(selectPopularAlbums);
    const popularAlbumsLoadingStatus = useSelector(
        selectPopularAlbumsLoadingStatus
    );
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const showAllItems = pathname === '/albums/popular-albums';

    useEffect(
        () => {
            dispatch(fetchPopularAlbums());
        }, // eslint-disable-next-line
        []
    );

    const renderItems = popularAlbums?.map((data) => (
        <AlbumItem key={data.album_id} albumData={data} />
    ));

    return (
        <div className="popular-albums">
            {!showAllItems && (
                <div className="popular-albums__top">
                    <h2 className="popular-albums__title">Popular albums</h2>
                    <Link
                        to="/albums/popular-albums"
                        className="popular-albums__link-all"
                    >
                        See all
                    </Link>
                </div>
            )}
            {popularAlbumsLoadingStatus === 'loading' ? (
                <ImSpinner2 className="spinner" />
            ) : popularAlbumsLoadingStatus === 'error' ? (
                'An error has occurred, reload the page...'
            ) : (
                <div
                    className={`popular-albums__list ${
                        showAllItems ? 'show-all-items' : ''
                    }`}
                >
                    {renderItems}
                </div>
            )}
        </div>
    );
};

export default PopularAlbumsList;
