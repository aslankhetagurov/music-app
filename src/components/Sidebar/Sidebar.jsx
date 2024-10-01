import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPause, FaPlay } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

import {
    selectShowSidebar,
    selectSidebarInfo,
    setAddSidebarInfo,
    setToggleShowSidebar,
} from './store/sidebarSlice';
import RenderArtistNames from '../RenderArtistNames/RenderArtistNames';
import {
    selectCurrentSong,
    selectCurrentSongsList,
    selectPlaying,
    setAddCurrentSong,
    setTogglePlaying,
} from '../../store/slices/generalStateSlice';
import LikeBtn from '../LikeBtn/LikeBtn';
import './Sidebar.scss';

const Sidebar = () => {
    const dispatch = useDispatch();
    const sidebarInfo = useSelector(selectSidebarInfo);
    const showSidebar = useSelector(selectShowSidebar);
    const currentSongsList = useSelector(selectCurrentSongsList);
    const currentSongData = useSelector(selectCurrentSong);
    const playing = useSelector(selectPlaying);

    const handleCloseSidebar = () => {
        dispatch(setToggleShowSidebar(false));
    };

    useEffect(
        () => {
            currentSongData && dispatch(setAddSidebarInfo(currentSongData));
        }, // eslint-disable-next-line
        [currentSongData]
    );

    const handleAudio = (songData) => {
        if (currentSongData?.song_id !== songData.song_id) {
            dispatch(setAddCurrentSong(songData));
        }
        if (currentSongData?.song_id === songData.song_id) {
            dispatch(setTogglePlaying());
        }
    };

    const renderQueue = () => {
        return currentSongsList.map((songData) => {
            const { song_id, image, title, artist } = songData;

            return (
                <div key={songData.song_id} className="sidebar__queue-item">
                    <div className="sidebar__item-left">
                        <button
                            onClick={() => handleAudio(songData)}
                            className={`sidebar__item-btn ${
                                currentSongData?.song_id === song_id
                                    ? 'sidebar__item-btn-active'
                                    : ''
                            }`}
                        >
                            <div className="sidebar__btn-icon">
                                {playing &&
                                currentSongData?.song_id === song_id ? (
                                    <FaPause />
                                ) : (
                                    <FaPlay className="play-svg" />
                                )}
                            </div>
                        </button>
                        <img
                            className="sidebar__item-img"
                            src={image}
                            alt="song image"
                        />
                    </div>
                    <div className="sidebar__item-main">
                        <div className="sidebar__queue-item-title">{title}</div>
                        <div className="sidebar__queue-item-artist">
                            {artist && <RenderArtistNames names={artist} />}
                        </div>
                    </div>
                    <LikeBtn data={songData} itemType="song" />
                </div>
            );
        });
    };

    const renderContent = () => {
        const { title, artist, image, genre, date } = sidebarInfo;

        return (
            <aside className="sidebar">
                <div className="sidebar__info">
                    <div className="sidebar__header">
                        <span className="sidebar__title">Playing song</span>
                        <button
                            onClick={handleCloseSidebar}
                            className="sidebar__close-btn"
                        >
                            <IoMdClose />
                        </button>
                    </div>
                    <LikeBtn songData={sidebarInfo} />
                    <img src={image} className="sidebar__img"></img>
                    <span className="sidebar__song-title">{title}</span>
                    <div className="sidebar__artist">
                        {artist && (
                            <RenderArtistNames names={artist} lineClamp />
                        )}
                    </div>
                    <div className="sidebar__other-info">
                        <span className="sidebar__year">
                            {date.match(/\d\d\d\d/).join('')}
                        </span>
                        <span style={{ margin: '0 10px' }}>*</span>
                        <span className="sidebar__genre">{genre}</span>
                    </div>
                </div>
                {currentSongsList && (
                    <div className="sidebar__queue">
                        <span className="sidebar__queue-title">
                            Next in queue
                        </span>
                        <div className="sidebar__queue-items">
                            {currentSongsList && renderQueue()}
                        </div>
                    </div>
                )}
            </aside>
        );
    };

    return showSidebar && sidebarInfo && renderContent();
};

export default Sidebar;
