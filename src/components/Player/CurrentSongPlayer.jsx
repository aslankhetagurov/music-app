import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FaRepeat } from 'react-icons/fa6';
import {
    FaRandom,
    FaPlay,
    FaStepForward,
    FaStepBackward,
    FaPause,
} from 'react-icons/fa';

import {
    RxSpeakerOff,
    RxSpeakerQuiet,
    RxSpeakerModerate,
    RxSpeakerLoud,
} from 'react-icons/rx';

import {
    selectCurrentSongsList,
    selectCurrentSong,
    selectPlaying,
    setTogglePlaying,
    setToggleRepeating,
    selectRepeating,
    setAddCurrentSong,
    setToggleRandom,
    selectRandom,
} from '../../store/slices/generalStateSlice';
import durationFormat from '../../utils/durationFormat';
import RenderArtistNames from '../RenderArtistNames/RenderArtistNames';
import { setAddAlertText, setAddAlertType } from '../Alert/store/alertSlice';
import supabase from '../../../supabaseClient';
import {
    selectRecentlyPlayed,
    setAddRecentlyPlayed,
} from '../RecentlyPlayedList/store/recentlyPlayedSlice';
import { selectUserInfo } from '../../store/slices/authSlice';
import LikeBtn from '../LikeBtn/LikeBtn';
import './CurrentSongPlayer.scss';

const CurrentSongPlayer = () => {
    const [song, setSong] = useState(null);
    const [duration, setDuration] = useState(null);
    const [volume, setVolume] = useState(50);
    const dispatch = useDispatch();
    const currentSongsList = useSelector(selectCurrentSongsList);
    const currentSongData = useSelector(selectCurrentSong);
    const playing = useSelector(selectPlaying);
    const repeating = useSelector(selectRepeating);
    const random = useSelector(selectRandom);
    const progressLineRef = useRef(null);
    const timelineRef = useRef(null);
    let { current: temporaryProgressLineRef } = useRef(null);
    const userInfo = useSelector(selectUserInfo);
    const recentlyPlayed = useSelector(selectRecentlyPlayed);
    const { pathname } = useLocation();
    const showAllItems = pathname === '/songs/recently-played';
    let volumeInputRef = useRef(null);

    useEffect(() => {
        //pause prev song
        song?.pause();

        const newSong = new Audio(currentSongData?.link);
        const addSongAndDuration = () => {
            setSong(newSong);
            setDuration(newSong.duration);

            newSong.volume = volume / 100;
            newSong.play();
        };
        newSong && newSong.addEventListener('loadeddata', addSongAndDuration);

        return () => {
            newSong.removeEventListener('loadeddata', addSongAndDuration);
        };
        // eslint-disable-next-line
    }, [currentSongData]);

    // play after audio creation
    useEffect(() => {
        if (song && !playing) {
            dispatch(setTogglePlaying());
        }
        // eslint-disable-next-line
    }, [song]);

    // play/pause audio controller
    useEffect(() => {
        if (song) {
            playing ? song.play() : song.pause();

            const changeProgressViaCurrentTime = ({ target }) => {
                const { currentTime } = target;
                let width = (currentTime * 100) / duration;

                if (!temporaryProgressLineRef) {
                    timelineRef.current.innerHTML = `${durationFormat(
                        currentTime
                    )} /`;
                    progressLineRef.current.style.width = `${width}%`;
                }
            };

            song.addEventListener('timeupdate', changeProgressViaCurrentTime);

            return () => {
                song.removeEventListener(
                    'timeupdate',
                    changeProgressViaCurrentTime
                );
            };
        }
        // eslint-disable-next-line
    }, [playing, song]);

    useEffect(() => {
        const toggleAfterEnd = () => {
            timelineRef.current.innerHTML = '00:00 /';
            progressLineRef.current.style.width = '0%';
            repeating ? song.play() : handlePrevOrNextSong('next');
        };

        if (song) {
            song.addEventListener('ended', toggleAfterEnd);
            return () => {
                song.removeEventListener('ended', toggleAfterEnd);
            };
        }
        // eslint-disable-next-line
    }, [song, repeating]);

    useEffect(() => {
        currentSongData && sendRecentlyPlayedSong();
        // eslint-disable-next-line
    }, [currentSongData]);

    const handleSongPlay = () => {
        dispatch(setTogglePlaying());
    };

    const changeSongProgressByClick = (evt) => {
        const { clientX } = evt;
        const { clientWidth } = document.documentElement;

        if (clientWidth > 1280) {
            const res = duration / 1280;
            const extraWidth = (clientWidth - 1280) / 2;
            song.currentTime = (clientX - extraWidth) * res;
        } else {
            const res = duration / clientWidth;
            song.currentTime = clientX * res;
        }
    };

    const changeSongProgressByMove = () => {
        const changeProgress = (evt) => {
            const { clientX } = evt;
            const { clientWidth } = document.documentElement;

            if (clientWidth > 1280) {
                const res = duration / 1280;
                const extraWidth = (clientWidth - 1280) / 2;
                temporaryProgressLineRef = (clientX - extraWidth) * res;
            } else {
                const res = duration / clientWidth;
                temporaryProgressLineRef = clientX * res;
            }
            let width = (temporaryProgressLineRef * 100) / duration;

            timelineRef.current.innerHTML = `${durationFormat(
                temporaryProgressLineRef
            )} /`;
            progressLineRef.current.style.width = `${width}%`;
        };

        const offMouseUp = () => {
            document.removeEventListener('mousemove', changeProgress);
            if (temporaryProgressLineRef) {
                song.currentTime = temporaryProgressLineRef;
            }
            temporaryProgressLineRef = null;
            document.removeEventListener('mouseup', offMouseUp);
        };

        document.addEventListener('mousemove', changeProgress);
        document.addEventListener('mouseup', offMouseUp);
    };

    const handleRepeating = () => {
        dispatch(setToggleRepeating());
    };

    const randomSongsList = useMemo(() => {
        if (currentSongsList && random) {
            const songsList = Object.values(currentSongsList).flat();

            return songsList.sort(
                () =>
                    Math.floor(Math.random() * 1000) -
                    Math.floor(Math.random() * 1000)
            );
        }
        // eslint-disable-next-line
    }, [random]);

    const handlePrevOrNextSong = (prevOrNext) => {
        const { song_id } = currentSongData;
        const songsList = Object.values(currentSongsList).flat();

        const currentIndex = songsList.findIndex(
            (item) => item.song_id === song_id
        );
        const randomCurrentIndex = randomSongsList?.findIndex(
            (item) => item.song_id === song_id
        );

        if (prevOrNext === 'prev') {
            if (song.currentTime > 5) {
                song.currentTime = 0;
            } else {
                const prevSong = random
                    ? randomSongsList[randomCurrentIndex - 1] ||
                      randomSongsList[randomSongsList.length - 1]
                    : songsList[currentIndex - 1] ||
                      songsList[songsList.length - 1];

                prevSong && dispatch(setAddCurrentSong(prevSong));
            }
        } else if (prevOrNext === 'next') {
            const nextSong = random
                ? randomSongsList[randomCurrentIndex + 1] || randomSongsList[0]
                : songsList[currentIndex + 1] || songsList[0];

            nextSong && dispatch(setAddCurrentSong(nextSong));
        }
    };

    const handleRandom = () => {
        dispatch(setToggleRandom());
    };

    const handleChangeVolume = (evt) => {
        const { value } = evt.target;
        song.volume = value / 100;
        setVolume(value);
        evt.target.style.background = `linear-gradient(to right, #8870ff ${value}%,#b8b8b8 ${value}%)`;
    };

    const renderVolumeIcon = () => {
        if (volume == 0) return <RxSpeakerOff />;
        if (volume <= 25) return <RxSpeakerQuiet />;
        if (volume > 25 && volume <= 75) return <RxSpeakerModerate />;
        if (volume > 75) return <RxSpeakerLoud />;
    };

    const handleVolumeOffToggle = () => {
        if (song.muted) {
            song.muted = false;
            const volume = song.volume * 100;
            setVolume(volume);
            volumeInputRef.current.style.background = `linear-gradient(to right, #8870ff ${volume}%,#b8b8b8 ${volume}%)`;
        } else {
            song.muted = true;
            setVolume(0);
            volumeInputRef.current.style.background =
                'linear-gradient(to right, #8870ff 0%,#b8b8b8 0%)';
        }
    };

    const sendRecentlyPlayedSong = () => {
        const findCopy = (element) =>
            element.song_id === currentSongData?.song_id;
        const isCopy = recentlyPlayed.some(findCopy);

        const insertSong = async () => {
            try {
                const { error } = await supabase
                    .from('recently_played')
                    .insert([
                        {
                            song_id: currentSongData?.song_id,
                            user_id: userInfo?.id,
                        },
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
                    .eq('song_id', currentSongData.song_id)
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

        if (isCopy) {
            updateSong();

            if (!showAllItems) {
                const findIndex = recentlyPlayed.findIndex(findCopy);
                const recentlyPlayedCopy = recentlyPlayed.slice();
                recentlyPlayedCopy.splice(findIndex, 1);
                recentlyPlayedCopy.unshift(currentSongData);
                dispatch(setAddRecentlyPlayed(recentlyPlayedCopy));
            }
        } else {
            insertSong();

            const recentlyPlayedCopy = recentlyPlayed.slice();
            recentlyPlayedCopy.unshift(currentSongData);
            dispatch(setAddRecentlyPlayed(recentlyPlayedCopy));
        }
    };

    const renderCurrentPlayer = (data) => {
        const { image, artist, title } = data;
        return (
            <div className="current-song ">
                <div
                    className="current-song__progress"
                    onClick={changeSongProgressByClick}
                    onMouseDown={changeSongProgressByMove}
                >
                    <div
                        className="current-song__progress-line"
                        ref={progressLineRef}
                    ></div>
                    <div className="current-song__timeline">
                        <span
                            className="current-song__timeline-start"
                            ref={timelineRef}
                        >
                            00:00 /
                        </span>
                        <span className="current-song__timeline-end">
                            {durationFormat(duration)}
                        </span>
                    </div>
                </div>

                <div className="current-song__main">
                    <div className="current-song__left-side">
                        <img className="current-song__img" src={image} />
                        <div className="current-song__info">
                            <div className="current-song__info-title">
                                {title}
                            </div>
                            <div className="current-song__info-artist">
                                {artist && <RenderArtistNames names={artist} />}
                            </div>
                        </div>
                        <LikeBtn songData={currentSongData} />
                    </div>

                    <div className="current-song__controls-center">
                        <button
                            className="current-song__controls-btn current-song__controls-prev"
                            onClick={() => handlePrevOrNextSong('prev')}
                        >
                            <FaStepBackward />
                        </button>
                        <button
                            className="current-song__controls-btn current-song__controls-play"
                            onClick={handleSongPlay}
                        >
                            {playing ? <FaPause /> : <FaPlay />}
                        </button>
                        <button
                            className="current-song__controls-btn current-song__controls-next"
                            onClick={() => handlePrevOrNextSong('next')}
                        >
                            <FaStepForward />
                        </button>
                    </div>
                    <div className="current-song__controls-right">
                        <div className="current-song__controls-volume-wrapper">
                            <div
                                className="current-song__controls-volume-icon"
                                onClick={handleVolumeOffToggle}
                            >
                                {renderVolumeIcon()}
                            </div>
                            <input
                                className="current-song__controls-volume-line"
                                onChange={handleChangeVolume}
                                value={volume}
                                ref={volumeInputRef}
                                type="range"
                                min="0"
                                max="100"
                            />
                        </div>
                        <button
                            className={`current-song__controls-btn current-song__controls-repeat ${
                                repeating ? 'current-song__btn-active' : ''
                            }`}
                            onClick={handleRepeating}
                        >
                            <FaRepeat />
                        </button>
                        <button
                            className={`current-song__controls-btn current-song__controls-random ${
                                random ? 'current-song__btn-active' : ''
                            }`}
                            onClick={handleRandom}
                        >
                            <FaRandom />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return currentSongData && renderCurrentPlayer(currentSongData);
};

export default CurrentSongPlayer;
