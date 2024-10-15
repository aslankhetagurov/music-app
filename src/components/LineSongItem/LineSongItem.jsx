import { useSelector, useDispatch } from 'react-redux';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { HiSpeakerWave } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import {
    selectCurrentSong,
    selectPlaying,
} from '../../store/slices/generalStateSlice';
import durationFormat from '../../utils/durationFormat';
import LikeBtn from '../LikeBtn/LikeBtn';
import handleSongPlay from '../../utils/handleSongPlay';
import handleAddSidebarInfo from '../Sidebar/utils/handleAddSidebarInfo';
import './LineSongItem.scss';

const LineSongItem = ({
    handleAddCurrentList,
    songData,
    songNum,
    handleClosePlaybackQueue,
}) => {
    const { song_id, image, name, duration, artist } = songData;
    const currentSongData = useSelector(selectCurrentSong);
    const playing = useSelector(selectPlaying);
    const dispatch = useDispatch();

    const renderFeaturingArtists = (artists) => {
        return artists.map((artist, id, arr) => (
            <span className="line-song-item__info-feat-artist" key={uuidv4()}>
                <Link
                    className="line-song-item__info-feat-link"
                    to={`/artists/${artist}/songs`}
                >
                    {artist}
                </Link>
                {arr.length > 1 && !id ? (
                    <span className="line-song-item__info-feat-word">
                        feat.
                    </span>
                ) : null}
            </span>
        ));
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
                        onClick={() =>
                            handleSongPlay(
                                dispatch,
                                songData,
                                currentSongData,
                                song_id,
                                handleAddCurrentList
                            )
                        }
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
                <div
                    className="line-song-item__content-wrapper"
                    onClick={(e) =>
                        handleAddSidebarInfo(
                            e,
                            dispatch,
                            ['line-song-item__info-feat-link'],
                            songData,
                            'Song'
                        )
                    }
                >
                    <img
                        className="line-song-item__img"
                        src={image}
                        alt="img"
                    />
                    <div className="line-song-item__info">
                        <div className="line-song-item__info-title line-song-item__info-text">
                            {name}
                        </div>
                        <div
                            onClick={handleClosePlaybackQueue}
                            className="line-song-item__info-feat"
                        >
                            {artist && renderFeaturingArtists(artist)}
                        </div>
                    </div>
                    <div className="line-song-item__duration">
                        {durationFormat(duration)}
                    </div>
                </div>
                <LikeBtn data={songData} itemType="song" />
            </div>
        );
    };

    return songData && renderItem();
};

export default LineSongItem;
