import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SquareSongItem from '../SquareSongItem/SquareSongItem';
import {
    fetchPopularSongs,
    selectPopularSongs,
    selectPopularSongsLoadingStatus,
} from './store/popularSongsSlice';
import { selectCurrentSongsList } from '../../store/slices/generalStateSlice';
import handleAddCurrentList from '../../utils/handleAddCurrentSongsList';
import ItemListLayout from '../../layouts/ItemListLayout/ItemListLayout';

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
        <ItemListLayout
            showAllItems={showAllItems}
            loadingStatus={songsLoadingStatus}
            items={renderItems}
            title="Popular songs"
            linkToAll="/songs/popular-songs"
        />
    );
};

export default PopularSongsList;
