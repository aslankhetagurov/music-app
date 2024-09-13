import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';

import {
    fetchRecentlyPlayed,
    selectRecentlyPlayed,
    selectRecentlyPlayedLoadingStatus,
    setAddRecentlyPlayed,
} from './store/recentlyPlayedSlice';
import { selectUserInfo } from '../../store/slices/authSlice';
import SquareSongItem from '../SquareSongItem/SquareSongItem';
import handleAddCurrentSongsList from '../../utils/handleAddCurrentSongsList';
import {
    selectCurrentSong,
    selectCurrentSongsList,
} from '../../store/slices/generalStateSlice';
import supabase from '../../../supabaseClient';
import { setAddAlertText, setAddAlertType } from '../Alert/store/alertSlice';
import './RecentlyPlayedList.scss';
import LineSongItem from '../LineSongItem/LineSongItem';

const RecentlyPlayedList = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const currentSongslist = useSelector(selectCurrentSongsList);
    const currentSong = useSelector(selectCurrentSong);
    const userInfo = useSelector(selectUserInfo);
    const recentlyPlayed = useSelector(selectRecentlyPlayed);
    const recentlyPlayedLoadingStatus = useSelector(
        selectRecentlyPlayedLoadingStatus
    );

    const showAllItems = pathname === '/songs/recently-played';

    useEffect(() => {
        currentSong && sendRecentlyPlayedSong();
        // eslint-disable-next-line
    }, [currentSong]);

    useEffect(() => {
        userInfo && dispatch(fetchRecentlyPlayed(userInfo.id));
        // eslint-disable-next-line
    }, [userInfo]);

    const insertSong = async () => {
        try {
            const { error } = await supabase
                .from('recently_played')
                .insert([
                    { song_id: currentSong?.song_id, user_id: userInfo?.id },
                ])
                .select();

            if (error) {
                dispatch(setAddAlertText(error.message));
                dispatch(setAddAlertType('error'));
            }
        } catch (error) {
            dispatch(setAddAlertText(error.message));
            dispatch(setAddAlertType('error'));
        }
    };

    const updateSong = async () => {
        try {
            const { error } = await supabase
                .from('recently_played')
                .update({ date: new Date().toISOString() })
                .eq('song_id', currentSong.song_id)
                .eq('user_id', userInfo.id);

            if (error) {
                dispatch(setAddAlertText(error.message));
                dispatch(setAddAlertType('error'));
            }
        } catch (error) {
            dispatch(setAddAlertText(error.message));
            dispatch(setAddAlertType('error'));
        }
    };

    const sendRecentlyPlayedSong = () => {
        const findCopy = (element) => element.song_id === currentSong?.song_id;
        const isCopy = recentlyPlayed.some(findCopy);

        if (isCopy) {
            updateSong();

            if (!showAllItems) {
                const findIndex = recentlyPlayed.findIndex(findCopy);
                const recentlyPlayedCopy = recentlyPlayed.slice();
                recentlyPlayedCopy.splice(findIndex, 1);
                recentlyPlayedCopy.unshift(currentSong);
                dispatch(setAddRecentlyPlayed(recentlyPlayedCopy));
            }
        } else {
            insertSong();

            const recentlyPlayedCopy = recentlyPlayed.slice();
            recentlyPlayedCopy.unshift(currentSong);
            dispatch(setAddRecentlyPlayed(recentlyPlayedCopy));
        }
    };

    const renderItems = showAllItems
        ? recentlyPlayed.map((data, i) => (
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
          ))
        : recentlyPlayed.map((data, i) => (
              <SquareSongItem
                  key={i}
                  songData={data}
                  handleAddCurrentList={() =>
                      handleAddCurrentSongsList(
                          currentSongslist,
                          recentlyPlayed
                      )
                  }
              />
          ));

    return (
        !!recentlyPlayed.length && (
            <div className="recently-played">
                {!showAllItems && (
                    <div className="recently-played__top">
                        <h2 className="recently-played__title">
                            Recently played
                        </h2>
                        <Link
                            to="/songs/recently-played"
                            className="recently-played__link-all"
                        >
                            See all
                        </Link>
                    </div>
                )}
                {recentlyPlayedLoadingStatus === 'loading' ? (
                    <ImSpinner2 className="spinner" />
                ) : recentlyPlayedLoadingStatus === 'error' ? (
                    'An error has occurred, reload the page...'
                ) : (
                    <div
                        className={`recently-played__list ${
                            showAllItems
                                ? 'show-all-items recently-played__list-column'
                                : ''
                        }`}
                    >
                        {renderItems}
                    </div>
                )}
            </div>
        )
    );
};

export default RecentlyPlayedList;
