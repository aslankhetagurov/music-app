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
import Slider from '../Slider/Slider';
import './PopularArtistsList.scss';

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
        <div className="popular-artists">
            {!showAllItems && (
                <div className="popular-artists__top">
                    <h2 className="popular-artists__title">Popular Artists</h2>
                    <Link
                        to="/artists/popular-artists"
                        className="popular-artists__link"
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
                <Slider
                    sliderItems={renderItems}
                    showAllItems={showAllItems}
                    duration={500}
                />
            )}
        </div>
    );
};

export default PopularArtistsList;
