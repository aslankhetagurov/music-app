import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';
import { FaPause, FaPlay } from 'react-icons/fa6';

import defaultImg from '../../assets/default-img.webp';
import {
    selectCurrentSong,
    selectPlaying,
    setAddCurrentSong,
    setTogglePlaying,
} from '../../store/slices/generalStateSlice';
import {
    fetchSingleSong,
    selectSingleSongData,
    selectSingleSongDataLoadingStatus,
} from './store/singleSongSlice';
import LikeBtn from '../LikeBtn/LikeBtn';
import LineSongItem from '../LineSongItem/LineSongItem';
import ShareBtn from '../ShareBtn/ShareBtn';
import './SingleSong.scss';

const SingleSong = () => {
    const dispatch = useDispatch();
    const singleSongData = useSelector(selectSingleSongData);
    const singleSongDataLoadingStatus = useSelector(
        selectSingleSongDataLoadingStatus
    );
    const currentSongData = useSelector(selectCurrentSong);
    const playing = useSelector(selectPlaying);
    const { songId } = useParams();

    useEffect(
        () => {
            songId && !singleSongData && dispatch(fetchSingleSong(songId));
        }, //eslint-disable-next-line
        [songId]
    );

    const renderContent = () => {
        const { image, name, main_artist, date, genre, song_id } =
            singleSongData;

        const handleAudio = () => {
            if (currentSongData?.song_id === song_id) {
                dispatch(setTogglePlaying());
            } else {
                dispatch(setAddCurrentSong(singleSongData));
            }
        };

        return (
            <section className="single-song">
                <div className="single-song__inner">
                    <img
                        className="single-song__img"
                        src={image || defaultImg}
                    />
                    <div className="single-song__main">
                        <div className="single-song__info">
                            <span className="single-song__label">Single</span>
                            <h1 className="single-song__title">{name}</h1>
                            <div className="single-song__more-info">
                                <div className="single-song__artist">
                                    <Link to={`/artists/${main_artist}/songs`}>
                                        {main_artist}
                                    </Link>
                                </div>
                                <span className="single-song__sep">*</span>
                                <div className="single-song__year">
                                    {date.split('-')[0]}
                                </div>
                                <span className="single-song__sep">*</span>
                                <div className="single-song__genre">
                                    {genre}
                                </div>
                            </div>
                        </div>
                        <div className="single-song__btns">
                            <button
                                className="single-song__play-btn"
                                onClick={handleAudio}
                            >
                                {playing &&
                                currentSongData?.song_id === song_id ? (
                                    <FaPause />
                                ) : (
                                    <FaPlay className="play-svg" />
                                )}
                            </button>

                            <LikeBtn data={singleSongData} itemType="song" />

                            <ShareBtn />
                        </div>
                    </div>
                </div>
                <div className="single-song__item">
                    <LineSongItem songData={singleSongData} songNum="1" />
                </div>
            </section>
        );
    };

    return singleSongDataLoadingStatus === 'loading' ? (
        <ImSpinner2 className="spinner" />
    ) : singleSongDataLoadingStatus === 'error' ? (
        <h1>An has occurred, reload the page...</h1>
    ) : (
        !!singleSongData && renderContent()
    );
};

export default SingleSong;
