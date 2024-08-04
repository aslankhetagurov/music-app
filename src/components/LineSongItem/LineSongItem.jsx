import { useSelector, useDispatch } from 'react-redux';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { HiSpeakerWave } from 'react-icons/hi2';
import { Link, useParams } from 'react-router-dom';

import {
    setAddCurrentSong,
    setTogglePlaying,
    selectCurrentSong,
    selectPlaying,
} from '../../store/slices/generalStateSlice';
import './LineSongItem.scss';
import durationFormat from '../../utils/durationFormat';

const LineSongItem = ({ handleAddCurrentList, songData, songNum }) => {
    const { song_id, image, title, duration, artist } = songData;
    const currentSongData = useSelector(selectCurrentSong);
    const playing = useSelector(selectPlaying);
    const dispatch = useDispatch();
    const { artistName } = useParams();

    const renderFeaturingArtists = (artists) => {
        return artists.map((artist, id) =>
            artistName === artist ? null : (
                <Link
                    className="line-song-item__info-feat-artist"
                    to={`/artists/${artist}/songs`}
                    key={id}
                >
                    {artist}
                </Link>
            )
        );
    };

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
                {artist.length > 1 && (
                    <div className="line-song-item__info-feat-wrapper">
                        <span className="line-song-item__info-feat-word">
                            feat.
                        </span>
                        <div className="line-song-item__info-feat">
                            {renderFeaturingArtists(artist)}
                        </div>
                    </div>
                )}
                <div className="line-song-item__duration">
                    {durationFormat(duration)}
                </div>
            </div>
        );
    };

    return songData && renderItem();
};

export default LineSongItem;
