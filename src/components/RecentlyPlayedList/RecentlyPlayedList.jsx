import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
    fetchRecentlyPlayed,
    selectRecentlyPlayed,
    selectRecentlyPlayedLoadingStatus,
} from './store/recentlyPlayedSlice';
import { selectUserInfo } from '../../store/slices/authSlice';
import SquareSongItem from '../SquareSongItem/SquareSongItem';
import handleAddCurrentSongsList from '../../utils/handleAddCurrentSongsList';
import { selectCurrentSongsList } from '../../store/slices/generalStateSlice';
import LineSongItem from '../LineSongItem/LineSongItem';
import ItemListLayout from '../../layouts/ItemListLayout/ItemListLayout';
import './RecentlyPlayedList.scss';

const RecentlyPlayedList = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const currentSongslist = useSelector(selectCurrentSongsList);
    const userInfo = useSelector(selectUserInfo);
    const recentlyPlayed = useSelector(selectRecentlyPlayed);
    const recentlyPlayedLoadingStatus = useSelector(
        selectRecentlyPlayedLoadingStatus
    );

    const showAllItems = pathname === '/songs/recently-played';

    useEffect(() => {
        userInfo &&
            dispatch(
                fetchRecentlyPlayed({
                    userId: userInfo.id,
                    limit: showAllItems ? 1000 : 10,
                })
            );
        // eslint-disable-next-line
    }, [userInfo]);

    const renderItems = showAllItems ? (
        <div className="recently-played__list">
            {recentlyPlayed.map((data, i) => (
                <LineSongItem
                    key={data.song_id}
                    songData={data}
                    handleAddCurrentList={() =>
                        handleAddCurrentSongsList(
                            currentSongslist,
                            recentlyPlayed
                        )
                    }
                    songNum={i + 1}
                />
            ))}
        </div>
    ) : (
        recentlyPlayed.map((data) => (
            <SquareSongItem
                key={data.song_id}
                songData={data}
                handleAddCurrentList={() =>
                    handleAddCurrentSongsList(currentSongslist, recentlyPlayed)
                }
            />
        ))
    );

    return (
        !!recentlyPlayed.length && (
            <ItemListLayout
                showAllItems={showAllItems}
                loadingStatus={recentlyPlayedLoadingStatus}
                items={renderItems}
                title="Recently played"
                linkToAll="/songs/recently-played"
            />
        )
    );
};

export default RecentlyPlayedList;
