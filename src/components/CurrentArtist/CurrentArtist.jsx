import { useParams, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { ImSpinner2 } from 'react-icons/im';

import {
    fetchCurrentArtist,
    selectCurrentArtistInfo,
    selectCurrentArtistSongs,
    selectCurrentArtistLoadingStatus,
} from './store/currentArtistSlice';
import {
    setAddCurrentSong,
    setTogglePlaying,
    selectCurrentSong,
    selectPlaying,
    selectCurrentSongsList,
} from '../../store/slices/generalStateSlice';
import handleAddCurrentSongsList from '../../utils/handleAddCurrentSongsList';
import defaultImg from '../../assets/avatar.png';
import LikeBtn from '../LikeBtn/LikeBtn';
import ShareBtn from '../ShareBtn/ShareBtn';
import './CurrentArtist.scss';

const CurrentArtist = () => {
    const { artistName } = useParams();
    const dispatch = useDispatch();
    const artistInfo = useSelector(selectCurrentArtistInfo);
    const artistSongs = useSelector(selectCurrentArtistSongs);
    const currentSongData = useSelector(selectCurrentSong);
    const currentSongsList = useSelector(selectCurrentSongsList);
    const playing = useSelector(selectPlaying);
    const currentArtistLoadingStatus = useSelector(
        selectCurrentArtistLoadingStatus
    );
    const isCurrentArtistPlaying =
        artistSongs?.some(
            (song) => currentSongData?.song_id === song.song_id
        ) &&
        currentSongsList?.every((song) =>
            song.artist?.some((artistName) => artistName === name)
        );

    useEffect(
        () => {
            artistName && dispatch(fetchCurrentArtist(artistName));
        }, // eslint-disable-next-line
        [artistName]
    );

    const handleAudio = (firstSong, name) => {
        if (isCurrentArtistPlaying) {
            dispatch(setTogglePlaying());
        } else {
            dispatch(setAddCurrentSong(firstSong));
            handleAddCurrentSongsList(currentSongsList, artistSongs);
        }
    };

    const renderContent = () => {
        const { image, name } = artistInfo[0];

        return (
            <section className="current-artist">
                <div className="current-artist__head">
                    <img
                        className="current-artist__head-img"
                        src={image || defaultImg}
                        alt={`${name} artist photo`}
                        width="200"
                        height="200"
                        loading="eager"
                        decoding="async"
                        fetchpriority="high"
                    />
                    <div className="current-artist__head-main">
                        <div className="current-artist__head-top">
                            <span className="current-artist__head-label">
                                Artist
                            </span>
                            <h1 className="current-artist__head-title">
                                {name}
                            </h1>
                        </div>
                        <div className="current-artist__head-btns">
                            <button
                                className="current-artist__head-btn"
                                onClick={() =>
                                    handleAudio(artistSongs[0], name)
                                }
                                aria-label={
                                    playing && isCurrentArtistPlaying
                                        ? `Pause ${name}`
                                        : `Play ${name}`
                                }
                            >
                                <div className="current-artist__head-btn-icon">
                                    {playing && isCurrentArtistPlaying ? (
                                        <FaPause />
                                    ) : (
                                        <FaPlay className="play-svg" />
                                    )}
                                </div>
                            </button>

                            <LikeBtn data={artistInfo[0]} itemType="artist" />

                            <ShareBtn />
                        </div>
                    </div>
                </div>

                <nav className="current-artist__tabs">
                    <ul className="current-artist__tabs-list">
                        <li className="current-artist__tab">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'current-artist__tab-link current-artist__tab-link-songs current-artist__tab-link-active'
                                        : 'current-artist__tab-link current-artist__tab-link-songs'
                                }
                                to="songs"
                                aria-label="View songs by this artist"
                            >
                                Songs
                            </NavLink>
                        </li>
                        <li className="current-artist__tab">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'current-artist__tab-link current-artist__tab-link-active'
                                        : 'current-artist__tab-link'
                                }
                                to="albums"
                                aria-label="View albums by this artist"
                            >
                                Albums
                            </NavLink>
                        </li>
                        <li className="current-artist__tab">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? 'current-artist__tab-link current-artist__tab-link-about current-artist__tab-link-active'
                                        : 'current-artist__tab-link current-artist__tab-link-about'
                                }
                                to="about"
                                aria-label="Learn more about this artist"
                            >
                                About
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </section>
        );
    };

    return currentArtistLoadingStatus === 'loading' ? (
        <ImSpinner2 className="spinner" />
    ) : currentArtistLoadingStatus === 'error' ? (
        <h3>An has occurred, reload the page...</h3>
    ) : (
        artistInfo && renderContent()
    );
};

export default CurrentArtist;
