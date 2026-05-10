import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { MdAddCircleOutline } from 'react-icons/md';
import { ImSpinner2 } from 'react-icons/im';

import avatar from '../../../assets/avatar.png';
import {
    setAddCurrentSong,
    setTogglePlaying,
    selectCurrentSong,
    selectPlaying,
    selectCurrentSongsList,
} from '../../../store/slices/generalStateSlice';
import {
    fetchUploadAvatar,
    selectUploadAvatarStatus,
    selectUserInfo,
} from '../../../store/slices/authSlice';
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
    const uploadAvatarStatus = useSelector(selectUploadAvatarStatus);
    const navigate = useNavigate();

    useEffect(() => {
        navigate('favorite-songs');
        // eslint-disable-next-line
    }, []);

    const handleAudio = (firstSong) => {
        if (
            favoriteSongs.some(
                (songObj) => currentSongData?.song_id === songObj.song_id
            ) &&
            currentSongsList === favoriteSongs
        ) {
            dispatch(setTogglePlaying());
        } else {
            dispatch(setAddCurrentSong(firstSong));
            handleAddCurrentSongsList(currentSongsList, favoriteSongs);
        }
    };

    const handleUploadAvatar = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        dispatch(fetchUploadAvatar({ userInfo, file }));
    };

    const renderContent = () => {
        const { email } = userInfo;
        const userName = email.split('@')[0];

        return (
            <div className="user-collection">
                <div className="user-collection__head">
                    <div className="user-collection__avatar">
                        <img
                            className="user-collection__avatar-img"
                            src={userInfo.avatar || avatar}
                            alt={`${userName}'s profile avatar`}
                            width="200"
                            height="200"
                            loading="eager"
                            decoding="async"
                            fetchpriority="high"
                        />
                        {uploadAvatarStatus === 'loading' ? (
                            <ImSpinner2 className="spinner" />
                        ) : (
                            <label className="user-collection__avatar-input-wrapper">
                                <input
                                    className="user-collection__avatar-input"
                                    type="file"
                                    name="avatar"
                                    onChange={handleUploadAvatar}
                                    tabIndex="0"
                                    title="Upload avatar. Max file size 10 MB."
                                />
                                <span className="user-collection__avatar-input-btn">
                                    <MdAddCircleOutline title="Upload avatar. Max file size 10 MB." />
                                </span>
                            </label>
                        )}
                    </div>
                    <div className="user-collection__head-main">
                        <div className="user-collection__head-top">
                            <span className="user-collection__head-label">
                                Collection
                            </span>
                            <h1 className="user-collection__head-title">
                                {userName}
                            </h1>
                        </div>
                        <button
                            className="user-collection__head-btn"
                            onClick={() => handleAudio(favoriteSongs[0])}
                            aria-label={
                                playing && currentSongsList === favoriteSongs
                                    ? 'Pause collection'
                                    : 'Play collection'
                            }
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

                <nav className="user-collection__tabs">
                    <ul className="user-collection__tabs-list">
                        <li className="user-collection__tab">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'user-collection__tab-link user-collection__tab-link-songs user-collection__tab-link-active'
                                        : 'user-collection__tab-link user-collection__tab-link-songs'
                                }
                                to="favorite-songs"
                            >
                                Songs
                            </NavLink>
                        </li>
                        <li className="user-collection__tab">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'user-collection__tab-link user-collection__tab-link-active'
                                        : 'user-collection__tab-link'
                                }
                                to="favorite-artists"
                            >
                                Artists
                            </NavLink>
                        </li>
                        <li className="user-collection__tab">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'user-collection__tab-link user-collection__tab-link-active'
                                        : 'user-collection__tab-link'
                                }
                                to="favorite-albums"
                            >
                                Albums
                            </NavLink>
                        </li>
                        <li className="user-collection__tab">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'user-collection__tab-link user-collection__tab-link-about user-collection__tab-link-active'
                                        : 'user-collection__tab-link user-collection__tab-link-about'
                                }
                                to="listening-history"
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
