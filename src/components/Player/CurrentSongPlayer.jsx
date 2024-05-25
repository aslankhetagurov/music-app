import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRepeat } from 'react-icons/fa6';
import {
    FaRandom,
    FaPlay,
    FaStepForward,
    FaStepBackward,
    FaPause,
} from 'react-icons/fa';

import {
    selectCurrentSong,
    selectPlaying,
    setTogglePlaying,
} from '../../store/slices/generalStateSlice';
import durationFormat from '../../utils/durationFormat';

import './CurrentSongPlayer.scss';

const CurrentSongPlayer = () => {
    const [song, setSong] = useState(null);
    const [duration, setDuration] = useState(null);

    const dispatch = useDispatch();

    const currentSongData = useSelector(selectCurrentSong);
    const playing = useSelector(selectPlaying);

    const progressRef = useRef(null);
    const timelineRef = useRef(null);
    let { current: temporaryProgressRef } = useRef(null);

    useEffect(() => {
        //pause prev song
        playing && dispatch(setTogglePlaying());

        const newSong = new Audio(currentSongData?.link);
        const addSongAndDuration = () => {
            setSong(newSong);
            setDuration(newSong.duration);
        };
        newSong && newSong.addEventListener('loadeddata', addSongAndDuration);

        return () => {
            newSong.removeEventListener('loadeddata', addSongAndDuration);
        };
        // eslint-disable-next-line
    }, [currentSongData]);

    // play after audio creation
    useEffect(() => {
        if (song) {
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

                if (!temporaryProgressRef) {
                    timelineRef.current.innerHTML = `${durationFormat(
                        currentTime
                    )} /`;
                    progressRef.current.style.width = `${width}%`;
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
    }, [playing]);

    const handleSongPlay = () => {
        dispatch(setTogglePlaying());
    };

    useEffect(() => {
        const toggleAfterEnd = () => {
            dispatch(setTogglePlaying());
            timelineRef.current.innerHTML = '00:00 /';
            progressRef.current.style.width = '0%';
        };

        if (song) {
            song.addEventListener('ended', toggleAfterEnd);
            return () => {
                song.removeEventListener('ended', toggleAfterEnd);
            };
        }
        // eslint-disable-next-line
    }, [song]);

    const changeProgressByClick = (evt) => {
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

    const changeProgressByMove = () => {
        const changeProgress = (evt) => {
            const { clientX } = evt;
            const { clientWidth } = document.documentElement;

            if (clientWidth > 1280) {
                const res = duration / 1280;
                const extraWidth = (clientWidth - 1280) / 2;
                temporaryProgressRef = (clientX - extraWidth) * res;
            } else {
                const res = duration / clientWidth;
                temporaryProgressRef = clientX * res;
            }
            let width = (temporaryProgressRef * 100) / duration;

            timelineRef.current.innerHTML = `${durationFormat(
                temporaryProgressRef
            )} /`;
            progressRef.current.style.width = `${width}%`;
        };

        const offMouseUp = () => {
            document.removeEventListener('mousemove', changeProgress);
            if (temporaryProgressRef) {
                song.currentTime = temporaryProgressRef;
            }
            temporaryProgressRef = null;
            document.removeEventListener('mouseup', offMouseUp);
        };

        document.addEventListener('mousemove', changeProgress);
        document.addEventListener('mouseup', offMouseUp);
    };

    const renderCurrentPlayer = (data) => {
        const { image, artist, title } = data;
        return (
            <div className="current-song ">
                <div
                    onClick={changeProgressByClick}
                    onMouseDown={changeProgressByMove}
                    className="current-song__progress"
                >
                    <div
                        ref={progressRef}
                        className="current-song__progress-line"
                    ></div>
                    <div className="current-song__timeline">
                        <span
                            ref={timelineRef}
                            className="current-song__timeline-start"
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
                            <div className="current-song__info-title current-song__info-text">
                                {title}
                            </div>
                            <div className="current-song__info-artist current-song__info-text">
                                {artist}
                            </div>
                        </div>
                    </div>

                    <div className="current-song__controls-center">
                        <button className="current-song__controls-btn current-song__controls-prev">
                            <FaStepBackward />
                        </button>
                        <button
                            onClick={handleSongPlay}
                            className="current-song__controls-btn current-song__controls-play"
                        >
                            {playing ? <FaPause /> : <FaPlay />}
                        </button>
                        <button className="current-song__controls-btn current-song__controls-next">
                            <FaStepForward />
                        </button>
                    </div>
                    <div className="current-song__controls-right">
                        <button className="current-song__controls-btn current-song__controls-repeat">
                            <FaRepeat />
                        </button>
                        <button className="current-song__controls-btn current-song__controls-random">
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
