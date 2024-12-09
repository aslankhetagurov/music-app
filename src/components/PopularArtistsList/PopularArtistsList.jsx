import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import ArtistItem from '../ArtistItem/ArtistItem';
import {
    fetchPopularArtists,
    selectPopularArtists,
    selectPopularArtistsLoadingStatus,
} from './store/popularArtistsSlice';
import ItemListLayout from '../../layouts/ItemListLayout/ItemListLayout';

const PopularArtistsList = () => {
    const dispatch = useDispatch();
    const popularArtists = useSelector(selectPopularArtists);
    const popularArtistsLoadingStatus = useSelector(
        selectPopularArtistsLoadingStatus
    );

    const { pathname } = useLocation();
    const showAllItems = pathname === '/artists/popular-artists';

    useEffect(
        () => {
            dispatch(fetchPopularArtists(showAllItems));
        }, // eslint-disable-next-line
        []
    );

    const renderItems = popularArtists.map((data) => {
        return <ArtistItem key={data.artist_id} artistData={data} />;
    });

    return (
        <ItemListLayout
            showAllItems={showAllItems}
            loadingStatus={popularArtistsLoadingStatus}
            items={renderItems}
            title="Popular Artists"
            linkToAll="/artists/popular-artists"
        />
    );
};

export default PopularArtistsList;
