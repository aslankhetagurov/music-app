import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
    fetchPopularAlbums,
    selectPopularAlbums,
    selectPopularAlbumsLoadingStatus,
} from './store/popularAlbumsListSlice';
import AlbumItem from '../AlbumItem/AlbumItem';
import ItemListLayout from '../../layouts/ItemListLayout/ItemListLayout';

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
            dispatch(fetchPopularAlbums(showAllItems ? 50 : 10));
        }, // eslint-disable-next-line
        []
    );

    const renderItems = popularAlbums?.map((data) => (
        <AlbumItem key={data.album_id} albumData={data} />
    ));

    return (
        <ItemListLayout
            showAllItems={showAllItems}
            loadingStatus={popularAlbumsLoadingStatus}
            items={renderItems}
            title="Popular albums"
            linkToAll="/albums/popular-albums"
        />
    );
};

export default PopularAlbumsList;
