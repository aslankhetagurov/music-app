import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import SquareSongItem from '../SquareSongItem/SquareSongItem';
import handleAddCurrentSongsList from '../../utils/handleAddCurrentSongsList';
import { selectCurrentSongsList } from '../../store/slices/generalStateSlice';
import {
    fetchRecommendedSongsList,
    selectRecommendedSongsList,
    selectRecommendedSongsListLoadingStatus,
} from './store/recommendedSongsListSlice';
import { selectUserInfo } from '../../store/slices/authSlice';
import ItemListLayout from '../../layouts/ItemListLayout/ItemListLayout';

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

    if (!userInfo || !recommendedSongsList?.length) return null;

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
        <ItemListLayout
            showAllItems={showAllItems}
            loadingStatus={recommendedSongsListLoadingStatus}
            items={renderItems}
            title="Recommended for you"
            linkToAll="/songs/recommended-songs"
        />
    );
};

export default RecommendedSongsList;
