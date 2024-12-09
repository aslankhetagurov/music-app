import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
    fetchNewReleasesList,
    selectNewReleasesList,
    selectNewReleasesListLoadingStatus,
} from './store/newReleasesListSlice';
import SquareSongItem from '../SquareSongItem/SquareSongItem';
import handleAddCurrentSongsList from '../../utils/handleAddCurrentSongsList';
import { selectCurrentSongsList } from '../../store/slices/generalStateSlice';
import ItemListLayout from '../../layouts/ItemListLayout/ItemListLayout';

const NewReleasesList = () => {
    const currentSongslist = useSelector(selectCurrentSongsList);
    const newReleasesList = useSelector(selectNewReleasesList);
    const newReleasesListLoadingStatus = useSelector(
        selectNewReleasesListLoadingStatus
    );
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const showAllItems = pathname === '/songs/new-releases';

    useEffect(
        () => {
            dispatch(fetchNewReleasesList(showAllItems ? 50 : 10));
        }, // eslint-disable-next-line
        []
    );

    const renderItems = newReleasesList?.map((data) => (
        <SquareSongItem
            key={data.id}
            songData={data}
            handleAddCurrentList={() =>
                handleAddCurrentSongsList(currentSongslist, newReleasesList)
            }
        />
    ));

    return (
        <ItemListLayout
            showAllItems={showAllItems}
            loadingStatus={newReleasesListLoadingStatus}
            items={renderItems}
            title="New Releases"
            linkToAll="/songs/new-releases"
        />
    );
};

export default NewReleasesList;
