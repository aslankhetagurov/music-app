import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaPlay, FaPause } from 'react-icons/fa6';

import {
    setAddCurrentSong,
    setTogglePlaying,
    selectCurrentSong,
    selectPlaying,
} from '../../store/slices/generalStateSlice';

import './SquareSongItem.scss';

const SquareSongItem = ({ handleAddCurrentList, songData }) => {
    const { song_id, image, artist, title } = songData;
    const currentSongData = useSelector(selectCurrentSong);
    const playing = useSelector(selectPlaying);
    const dispatch = useDispatch();

    const handleAudio = () => {
        handleAddCurrentList();

        if (currentSongData?.song_id !== song_id) {
            dispatch(setAddCurrentSong(songData));
        }
        if (currentSongData?.song_id === song_id) {
            dispatch(setTogglePlaying());
        }
    };

    const renderItem = () => {
        return (
            <div className="song-item">
                <div className="song-item__wrapper">
                    <div className="song-item__top">
                        <img className="song-item__img" src={image} alt="img" />
                        <button
                            onClick={() => handleAudio(songData)}
                            className={`song-item__btn ${
                                playing && currentSongData.song_id === song_id
                                    ? 'song-item__btn_active'
                                    : ''
                            }`}
                        >
                            <span className="song-item__btn-circle">
                                {playing &&
                                currentSongData.song_id === song_id ? (
                                    <FaPause />
                                ) : (
                                    <FaPlay />
                                )}
                            </span>
                        </button>
                    </div>
                    <div className="song-item__info">
                        <div className="song-item__info-title song-item__info-text">
                            {title}
                        </div>
                        <Link className="song-item__info-artist song-item__info-text">
                            {artist}
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    return renderItem();
};

export default SquareSongItem;
