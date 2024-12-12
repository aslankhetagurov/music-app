import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaPause, FaPlay } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

import {
    selectShowSidebar,
    selectSidebarInfo,
    selectSidebarInfoType,
    selectSidebarList,
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
import defaultImg from '../../assets/default-img.webp';
import handleAddCurrentSongsList from '../../utils/handleAddCurrentSongsList';
import { setAddSingleSongData } from '../SingleSong/store/singleSongSlice';
import './Sidebar.scss';

const Sidebar = () => {
    const dispatch = useDispatch();
    const sidebarInfo = useSelector(selectSidebarInfo);
    const showSidebar = useSelector(selectShowSidebar);
    const currentSongsList = useSelector(selectCurrentSongsList);
    const currentSongData = useSelector(selectCurrentSong);
    const playing = useSelector(selectPlaying);
    const sidebarInfoType = useSelector(selectSidebarInfoType);
    const sidebarList = useSelector(selectSidebarList);

    const handleCloseSidebar = () => {
        dispatch(setToggleShowSidebar(false));
    };

    const handlePlaySong = (songData) => {
        if (
            currentSongData?.song_id !== songData.song_id &&
            sidebarInfoType === 'Album'
        ) {
            dispatch(setAddCurrentSong(songData));
            handleAddCurrentSongsList(currentSongsList, sidebarList);
        } else if (currentSongData?.song_id !== songData.song_id) {
            dispatch(setAddCurrentSong(songData));
        }

        if (currentSongData?.song_id === songData.song_id) {
            dispatch(setTogglePlaying());
        }
    };

    const handlePlayMain = () => {
        if (
            sidebarInfoType === 'Album' &&
            sidebarList.some(
                (song) => song.song_id === currentSongData?.song_id
            ) &&
            currentSongsList === sidebarList
        ) {
            dispatch(setTogglePlaying());
        } else if (sidebarInfoType === 'Album') {
            dispatch(setAddCurrentSong(sidebarList[0]));
            handleAddCurrentSongsList(currentSongsList, sidebarList);
        }

        if (
            sidebarInfoType === 'Song' &&
            currentSongData?.song_id === sidebarInfo.song_id
        ) {
            dispatch(setTogglePlaying());
        } else if (sidebarInfoType === 'Song') {
            dispatch(setAddCurrentSong(sidebarInfo));
        }
    };

    const handleDispatchSingleSongData = (songData) => {
        dispatch(setAddSingleSongData(songData));
    };

    const renderSidebarList = () => {
        return sidebarList?.map((songData) => {
            const { song_id, image, name, artist, id } = songData;

            return (
                <div key={songData.song_id} className="sidebar__list-item">
                    <div className="sidebar__item-left">
                        <button
                            onClick={() => handlePlaySong(songData)}
                            className={`sidebar__item-btn ${
                                currentSongData?.song_id === song_id &&
                                currentSongsList === sidebarList
                                    ? 'sidebar__item-btn-active'
                                    : ''
                            }`}
                        >
                            <div className="sidebar__btn-icon">
                                {playing &&
                                currentSongData?.song_id === song_id &&
                                currentSongsList === sidebarList ? (
                                    <FaPause />
                                ) : (
                                    <FaPlay className="play-svg" />
                                )}
                            </div>
                        </button>
                        <img
                            className="sidebar__item-img"
                            src={image || defaultImg}
                            alt="song image"
                        />
                    </div>
                    <div className="sidebar__item-main">
                        <Link
                            className="sidebar__list-item-name"
                            to={`/songs/${id}`}
                            onClick={() =>
                                handleDispatchSingleSongData(songData)
                            }
                        >
                            {name}
                        </Link>
                        <div className="sidebar__list-item-artist">
                            {artist && <RenderArtistNames names={artist} />}
                        </div>
                    </div>
                    <LikeBtn data={songData} itemType="song" />
                </div>
            );
        });
    };

    const renderContent = () => {
        const { name, artist, image, genre, date, song_id, albums, id } =
            sidebarInfo;

        return (
            <aside className="sidebar">
                <div className="sidebar__info">
                    <div className="sidebar__header">
                        <h3 className="sidebar__title">{sidebarInfoType}</h3>
                        <button
                            onClick={handleCloseSidebar}
                            className="sidebar__close-btn"
                        >
                            <IoMdClose />
                        </button>
                    </div>
                    <div className="sidebar__top">
                        <div className="sidebar__btns">
                            <button
                                onClick={handlePlayMain}
                                className="sidebar__main-btn"
                            >
                                <span className="sidebar__main-btn-circle">
                                    {(playing &&
                                        currentSongsList?.some(
                                            (song) =>
                                                song.song_id ===
                                                currentSongData.song_id
                                        ) &&
                                        currentSongsList === sidebarList) ||
                                    (playing &&
                                        currentSongData?.song_id ===
                                            song_id) ? (
                                        <FaPause />
                                    ) : (
                                        <FaPlay className="play-svg" />
                                    )}
                                </span>
                            </button>
                            <LikeBtn
                                data={sidebarInfo}
                                itemType={sidebarInfoType.toLowerCase()}
                            />
                        </div>
                        <img
                            src={image || defaultImg}
                            className="sidebar__img"
                        ></img>
                    </div>
                    {sidebarInfoType === 'Album' ? (
                        <Link
                            to={`/albums/${id}`}
                            className="sidebar__item-name"
                        >
                            {name}
                        </Link>
                    ) : (
                        <Link
                            className="sidebar__item-name"
                            to={`/songs/${id}`}
                            onClick={() =>
                                handleDispatchSingleSongData(sidebarInfo)
                            }
                        >
                            {name}
                        </Link>
                    )}
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
                    {sidebarInfoType === 'Song' && (
                        <div className="sidebar__album">
                            <span className="sidebar__album-label">
                                Album:{' '}
                            </span>
                            <Link
                                className="sidebar__album-title"
                                to={`/albums/${albums.id}`}
                            >
                                {albums.name}
                            </Link>
                        </div>
                    )}
                </div>
                {sidebarList && (
                    <div className="sidebar__list">
                        <div className="sidebar__list-items">
                            {renderSidebarList()}
                        </div>
                    </div>
                )}
            </aside>
        );
    };

    return showSidebar && sidebarInfo && renderContent();
};

export default Sidebar;
