import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';

import SquareSongItem from '../SquareSongItem/SquareSongItem';
import handleAddCurrentSongsList from '../../utils/handleAddCurrentSongsList';
import { selectCurrentSongsList } from '../../store/slices/generalStateSlice';
import {
    fetchRecommendedSongsList,
    selectRecommendedSongsList,
    selectRecommendedSongsListLoadingStatus,
} from './store/recommendedSongsListSlice';
import Slider from '../Slider/Slider';
import { selectUserInfo } from '../../store/slices/authSlice';
import './RecommendedSongsList.scss';

const RecommendedSongsList = () => {
    const currentSongslist = useSelector(selectCurrentSongsList);
    const recommendedSongsList = useSelector(selectRecommendedSongsList);
    const recommendedSongsListLoadingStatus = useSelector(
        selectRecommendedSongsListLoadingStatus
    );
    const userInfo = useSelector(selectUserInfo);
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const showAllItems = pathname === '/songs/recommended-songs';

    useEffect(
        () => {
            userInfo &&
                dispatch(
                    fetchRecommendedSongsList({
                        userId: userInfo.id,
                        limit: showAllItems ? 50 : 10,
                    })
                );
        }, // eslint-disable-next-line
        [userInfo]
    );

    const renderItems = recommendedSongsList?.map((data) => (
        <SquareSongItem
            key={data.id}
            songData={data}
            handleAddCurrentList={() =>
                handleAddCurrentSongsList(
                    currentSongslist,
                    recommendedSongsList
                )
            }
        />
    ));

    return (
        !!renderItems?.length && (
            <div className="recommended-songs-list">
                {!showAllItems && (
                    <div className="recommended-songs-list__top">
                        <h2 className="recommended-songs-list__title">
                            Recommended for you
                        </h2>
                        <Link
                            to="/songs/recommended-songs"
                            className="recommended-songs-list__link-all"
                        >
                            See all
                        </Link>
                    </div>
                )}
                {recommendedSongsListLoadingStatus === 'loading' ? (
                    <ImSpinner2 className="spinner" />
                ) : recommendedSongsListLoadingStatus === 'error' ? (
                    'An error has occurred, reload the page...'
                ) : (
                    <Slider
                        sliderItems={renderItems}
                        showAllItems={showAllItems}
                        duration={500}
                    />
                )}
            </div>
        )
    );
};

export default RecommendedSongsList;
