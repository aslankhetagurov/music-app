import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';

import ArtistItem from '../ArtistItem/ArtistItem';
import {
    fetchPopularArtists,
    selectPopularArtists,
    selectPopularArtistsLoadingStatus,
} from './store/popularArtistsSlice';

import './PopularArtistsList.scss';

const PopularArtistsList = () => {
    const dispatch = useDispatch();
    const popularArtists = useSelector(selectPopularArtists);
    const popularArtistsLoadingStatus = useSelector(
        selectPopularArtistsLoadingStatus
    );

    const { pathname } = useLocation();
    const loadAllItems = pathname === '/artists/popularArtists';

    useEffect(
        () => {
            dispatch(fetchPopularArtists(loadAllItems));
        }, // eslint-disable-next-line
        []
    );

    const renderItems = popularArtists.map((data) => {
        return <ArtistItem key={data.artist_id} artistData={data} />;
    });

    return (
        <div className="popular-artists">
            {!loadAllItems && (
                <div className="popular-artists__top">
                    <h2 className="popular-artists__top-title">
                        Popular Artists
                    </h2>
                    <Link
                        to="/artists/popularArtists"
                        className="popular-artists__top-link"
                    >
                        See all
                    </Link>
                </div>
            )}
            {popularArtistsLoadingStatus === 'loading' ? (
                <ImSpinner2 className="spinner" />
            ) : popularArtistsLoadingStatus === 'error' ? (
                'An error has occurred, reload the page...'
            ) : (
                <div
                    className={`popular-artists__list ${
                        loadAllItems ? 'show-all-items' : ''
                    }`}
                >
                    {renderItems}
                </div>
            )}
        </div>
    );
};

export default PopularArtistsList;
