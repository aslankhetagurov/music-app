import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlay, FaPause } from 'react-icons/fa6';

import avatar from '../../../assets/avatar.png';
import {
    setAddCurrentSong,
    setTogglePlaying,
    selectCurrentSong,
    selectPlaying,
    selectCurrentSongsList,
} from '../../../store/slices/generalStateSlice';
import { selectUserInfo } from '../../../store/slices/authSlice';
import { selectFavoriteSongs } from '../store/userCollectionSlice';
import handleAddCurrentSongsList from '../../../utils/handleAddCurrentSongsList';
import './UserCollectionMain.scss';

const UserCollectionMain = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const favoriteSongs = useSelector(selectFavoriteSongs);
    const currentSongData = useSelector(selectCurrentSong);
    const currentSongsList = useSelector(selectCurrentSongsList);
    const playing = useSelector(selectPlaying);

    const handleAudio = (firstSong) => {
        if (
            favoriteSongs.some(
                (songObj) => currentSongData?.song_id === songObj.song_id
            )
        ) {
            dispatch(setTogglePlaying());
        } else {
            dispatch(setAddCurrentSong(firstSong));
        }

        handleAddCurrentSongsList(currentSongsList, favoriteSongs);
    };

    const renderContent = () => {
        const { email } = userInfo;
        const userName = email.split('@')[0];

        return (
            <div className="user-colletion">
                <div className="user-colletion__head">
                    <img className="user-colletion__head-img" src={avatar} />
                    <div className="user-colletion__head-main">
                        <div className="user-colletion__head-top">
                            <span className="user-colletion__head-label">
                                Collection
                            </span>
                            <h1 className="user-colletion__head-title">
                                {userName}
                            </h1>
                        </div>
                        <button
                            className="user-colletion__head-btn"
                            onClick={() => handleAudio(favoriteSongs[0])}
                        >
                            {playing && currentSongsList === favoriteSongs ? (
                                <FaPause />
                            ) : (
                                <FaPlay className="play-svg" />
                            )}{' '}
                            <span>Play Collection</span>
                        </button>
                    </div>
                </div>

                <nav className="user-colletion__tabs">
                    <ul className="user-colletion__tabs-list">
                        <li className="user-colletion__tab">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'user-colletion__tab-link user-colletion__tab-link-songs user-colletion__tab-link-active'
                                        : 'user-colletion__tab-link user-colletion__tab-link-songs'
                                }
                                to="favorite-songs"
                            >
                                Favorite Songs
                            </NavLink>
                        </li>
                        <li className="user-colletion__tab">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'user-colletion__tab-link user-colletion__tab-link-active'
                                        : 'user-colletion__tab-link'
                                }
                                to="artists"
                            >
                                Artists
                            </NavLink>
                        </li>
                        <li className="user-colletion__tab">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'user-colletion__tab-link user-colletion__tab-link-about user-colletion__tab-link-active'
                                        : 'user-colletion__tab-link user-colletion__tab-link-about'
                                }
                                to="history"
                            >
                                History
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    };

    return userInfo && renderContent();
};

export default UserCollectionMain;
