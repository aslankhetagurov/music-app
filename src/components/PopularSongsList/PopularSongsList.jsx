import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ImSpinner2 } from 'react-icons/im';

import SquareSongItem from '../SquareSongItem/SquareSongItem';
import {
    fetchPopularSongs,
    selectPopularSongs,
    selectPopularSongsLoadingStatus,
} from './store/popularSongsSlice';

import './PopularSongsList.scss';

const PopularSongsList = () => {
    const popularSongs = useSelector(selectPopularSongs);
    const songsLoadingStatus = useSelector(selectPopularSongsLoadingStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPopularSongs());
    }, []);

    const renderItems = popularSongs.map(({ id, ...data }) => (
        <SquareSongItem key={id} songData={data} />
    ));

    return (
        <div className="popular-songs">
            <div className="popular-songs__top">
                <h3 className="popular-songs__title">Popular songs</h3>
                <Link className="popular-songs__link-all">See all</Link>
            </div>
            {songsLoadingStatus === 'loading' ? (
                <ImSpinner2 className="spinner" />
            ) : songsLoadingStatus === 'error' ? (
                'An error has occurred, reload the page...'
            ) : (
                <div className="popular-songs__list">{renderItems}</div>
            )}
        </div>
    );
};

export default PopularSongsList;
