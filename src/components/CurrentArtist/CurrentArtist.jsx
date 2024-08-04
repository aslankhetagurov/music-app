import { useParams, NavLink } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlay, FaPause, FaShareNodes } from 'react-icons/fa6';
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
    const copyTooltipRef = useRef();
    let tooltipTimer = null;

    const handleShareArtistLink = async () => {
        try {
            copyTooltipRef.current.style.opacity = '1';
            copyTooltipRef.current.style.visibility = 'visible';
            await navigator.clipboard.writeText(document.location.href);
            tooltipTimer = setTimeout(() => {
                copyTooltipRef.current.style.opacity = '0';
                copyTooltipRef.current.style.visibility = 'hidden';
                clearTimeout(tooltipTimer);
            }, 1500);
        } catch (err) {
            console.error('error', err);
        }
    };

    useEffect(
        () => {
            artistName && dispatch(fetchCurrentArtist(artistName));
        }, // eslint-disable-next-line
        [artistName]
    );

    const handleAudio = (firstSong) => {
        if (
            artistSongs.some(
                (songObj) => currentSongData?.song_id === songObj.song_id
            )
        ) {
            dispatch(setTogglePlaying());
        } else {
            dispatch(setAddCurrentSong(firstSong));
        }

        handleAddCurrentSongsList(currentSongsList, artistSongs);
    };

    const renderContent = () => {
        const { image, name } = artistInfo[0];

        return (
            <div className="current-artist">
                <div className="current-artist__head">
                    <img className="current-artist__head-img" src={image} />
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
                                    handleAudio(
                                        artistSongs[0],
                                        artistSongs,
                                        currentSongData
                                    )
                                }
                            >
                                <div className="current-artist__head-btn-icon">
                                    {playing &&
                                    currentSongData?.artist.includes(
                                        artistName
                                    ) ? (
                                        <FaPause />
                                    ) : (
                                        <FaPlay className="play-svg" />
                                    )}
                                </div>
                            </button>
                            <button
                                className="current-artist__head-btn current-artist__head-btn-share "
                                onClick={handleShareArtistLink}
                            >
                                <span className="current-artist__head-btn-icon">
                                    <FaShareNodes />
                                </span>
                                <span className="current-artist__head-btn-text">
                                    share
                                </span>
                                <span
                                    ref={copyTooltipRef}
                                    className="current-artist__share-tooltip"
                                >
                                    Link copied
                                </span>
                            </button>
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
                            >
                                About the artist
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    };

    return currentArtistLoadingStatus === 'loading' ? (
        <ImSpinner2 className="spinner" />
    ) : currentArtistLoadingStatus === 'error' ? (
        <h1>An has occurred, reload the page...</h1>
    ) : (
        artistInfo && artistSongs && renderContent()
    );
};

export default CurrentArtist;
