import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ImSpinner2 } from 'react-icons/im';

import SquareSongItem from '../SquareSongItem/SquareSongItem';
import {
    fetchPopularSongs,
    selectPopularSongs,
    selectPopularSongsLoadingStatus,
} from './store/popularSongsSlice';
import { selectCurrentSongsList } from '../../store/slices/generalStateSlice';
import handleAddCurrentList from '../../utils/handleAddCurrentSongsList';
import Slider from '../Slider/Slider';
import './PopularSongsList.scss';

const PopularSongsList = () => {
    const currentSongslist = useSelector(selectCurrentSongsList);
    const popularSongs = useSelector(selectPopularSongs);
    const songsLoadingStatus = useSelector(selectPopularSongsLoadingStatus);
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const showAllItems = pathname === '/songs/popular-songs';

    useEffect(
        () => {
            dispatch(fetchPopularSongs(showAllItems ? 50 : 10));
        }, // eslint-disable-next-line
        []
    );

    const renderItems = popularSongs.map((data) => (
        <SquareSongItem
            key={data.id}
            songData={data}
            handleAddCurrentList={() =>
                handleAddCurrentList(currentSongslist, popularSongs)
            }
        />
    ));

    return (
        <div className="popular-songs">
            {!showAllItems && (
                <div className="popular-songs__top">
                    <h2 className="popular-songs__title">Popular songs</h2>
                    <Link
                        to="/songs/popular-songs"
                        className="popular-songs__link-all"
                    >
                        See all
                    </Link>
                </div>
            )}
            {songsLoadingStatus === 'loading' ? (
                <ImSpinner2 className="spinner" />
            ) : songsLoadingStatus === 'error' ? (
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

export default PopularSongsList;
