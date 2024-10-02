import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImSpinner2 } from 'react-icons/im';

import { selectUserInfo } from '../../../store/slices/authSlice';
import {
    fetchRecentlyPlayed,
    selectRecentlyPlayed,
    selectRecentlyPlayedLoadingStatus,
} from '../../RecentlyPlayedList/store/recentlyPlayedSlice';
import LineSongItem from '../../LineSongItem/LineSongItem';
import handleAddCurrentSongsList from '../../../utils/handleAddCurrentSongsList';
import { selectCurrentSongsList } from '../../../store/slices/generalStateSlice';
import './ListeningHistory.scss';

const ListeningHistory = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const currentSongslist = useSelector(selectCurrentSongsList);
    const recentlyPlayed = useSelector(selectRecentlyPlayed);
    const recentlyPlayedLoadingStatus = useSelector(
        selectRecentlyPlayedLoadingStatus
    );

    useEffect(() => {
        userInfo &&
            dispatch(fetchRecentlyPlayed({ userId: userInfo.id, limit: 1000 }));
        // eslint-disable-next-line
    }, [userInfo]);

    const renderItems = recentlyPlayed.map((data, i) => (
        <LineSongItem
            key={data.song_id}
            songData={data}
            handleAddCurrentList={() =>
                handleAddCurrentSongsList(currentSongslist, recentlyPlayed)
            }
            songNum={i + 1}
        />
    ));

    return recentlyPlayed.length ? (
        <div className="listening-history">
            <h2 className="listening-history__title">Listening History</h2>

            {recentlyPlayedLoadingStatus === 'loading' ? (
                <ImSpinner2 className="spinner" />
            ) : recentlyPlayedLoadingStatus === 'error' ? (
                'An error has occurred, reload the page...'
            ) : (
                <div className="listening-history__list">{renderItems}</div>
            )}
        </div>
    ) : (
        <h3>No songs listened yet</h3>
    );
};

export default ListeningHistory;
