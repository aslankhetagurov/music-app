import { useSelector, useDispatch } from 'react-redux';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { HiSpeakerWave } from 'react-icons/hi2';

import {
    setAddCurrentSong,
    setTogglePlaying,
    selectCurrentSong,
    selectPlaying,
} from '../../store/slices/generalStateSlice';
import './LineSongItem.scss';
import durationFormat from '../../utils/durationFormat';

const LineSongItem = ({ handleAddCurrentList, songData, songNum }) => {
    const { song_id, image, title, duration } = songData;
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
            <div tabIndex={0} className="line-song-item">
                <div className="line-song-item__num-btn">
                    <div className="line-song-item__num">
                        {currentSongData?.song_id === song_id && playing ? (
                            <HiSpeakerWave
                                style={{ color: '#fff', fontSize: '20px' }}
                            />
                        ) : currentSongData?.song_id === song_id && !playing ? (
                            <button className="line-song-item__btn-playing-state">
                                <span className="line-song-item__btn-icon">
                                    <FaPlay className="play-svg" />
                                </span>
                            </button>
                        ) : (
                            songNum
                        )}
                    </div>
                    <button
                        onClick={() => handleAudio()}
                        className={`line-song-item__btn ${
                            playing && currentSongData?.song_id === song_id
                                ? 'line-song-item__btn_active'
                                : ''
                        }`}
                    >
                        <span className="line-song-item__btn-icon">
                            {playing && currentSongData?.song_id === song_id ? (
                                <FaPause />
                            ) : (
                                <FaPlay className="play-svg" />
                            )}
                        </span>
                    </button>
                </div>
                <img className="line-song-item__img" src={image} alt="img" />
                <div className="line-song-item__info-title line-song-item__info-text">
                    {title}
                </div>
                <div className="line-song-item__duration">
                    {durationFormat(duration)}
                </div>
            </div>
        );
    };

    return songData && renderItem();
};

export default LineSongItem;
