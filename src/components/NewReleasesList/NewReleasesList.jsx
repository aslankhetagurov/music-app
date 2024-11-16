import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';

import {
    fetchNewReleasesList,
    selectNewReleasesList,
    selectNewReleasesListLoadingStatus,
} from './store/newReleasesListSlice';
import SquareSongItem from '../SquareSongItem/SquareSongItem';
import handleAddCurrentSongsList from '../../utils/handleAddCurrentSongsList';
import Slider from '../Slider/Slider';
import { selectCurrentSongsList } from '../../store/slices/generalStateSlice';
import './NewReleasesList.scss';

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
        <div className="new-releases-list">
            {!showAllItems && (
                <div className="new-releases-list__top">
                    <h2 className="new-releases-list__title">New Releases</h2>
                    <Link
                        to="/songs/new-releases"
                        className="new-releases-list__link-all"
                    >
                        See all
                    </Link>
                </div>
            )}
            {newReleasesListLoadingStatus === 'loading' ? (
                <ImSpinner2 className="spinner" />
            ) : newReleasesListLoadingStatus === 'error' ? (
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

export default NewReleasesList;
