import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';

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
import Slider from '../Slider/Slider';
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
                    limit: showAllItems ? '' : 10,
                })
            );
        // eslint-disable-next-line
    }, [userInfo]);

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
                ) : showAllItems ? (
                    <div className="recently-played__list">{renderItems}</div>
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

export default RecentlyPlayedList;
