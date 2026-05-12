import { useSelector, useDispatch } from 'react-redux';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { HiSpeakerWave } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { RiMedalFill } from 'react-icons/ri';
import { setAddSingleSongData } from '../SingleSong/store/singleSongSlice';

import {
    selectCurrentSong,
    selectPlaying,
} from '../../store/slices/generalStateSlice';
import durationFormat from '../../utils/durationFormat';
import LikeBtn from '../LikeBtn/LikeBtn';
import handleSongPlay from '../../utils/handleSongPlay';
import handleAddSidebarInfo from '../Sidebar/utils/handleAddSidebarInfo';
import defaultImg from '../../assets/default-img.webp';
import './LineSongItem.scss';

const LineSongItem = ({
    handleAddCurrentList,
    songData,
    songNum,
    handleClosePlaybackQueue,
    prevPosition,
    imgLoading = 'lazy',
    imgFetchpriority = 'low',
}) => {
    const { song_id, image, name, duration, artist, id } = songData;
    const currentSongData = useSelector(selectCurrentSong);
    const playing = useSelector(selectPlaying);
    const dispatch = useDispatch();

    const handleDispatchSingleSongData = () => {
        dispatch(setAddSingleSongData(songData));
    };

    const renderFeaturingArtists = (artists) => {
        return artists.map((artist, index) => (
            <span
                className="line-song-item__info-feat-artist"
                key={`${song_id}-artist-${index}`}
            >
                <Link
                    className="line-song-item__info-feat-link"
                    to={`/artists/${artist}/songs`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {artist}
                </Link>
                {index < artists.length - 1 && (
                    <span className="line-song-item__info-feat-word">
                        feat.
                    </span>
                )}
            </span>
        ));
    };

    const itemPositionChange = () => {
        if (songNum === 1) {
            return <RiMedalFill style={{ color: 'gold' }} />;
        }

        if (prevPosition < 0) {
            return <div className="line-song-item__new-item">new</div>;
        }

        if (prevPosition < songNum) {
            return (
                <MdKeyboardArrowDown
                    style={{ color: '#fa6d6d', fontSize: '20px' }}
                />
            );
        }

        if (prevPosition > songNum) {
            return (
                <MdKeyboardArrowUp
                    style={{ color: '#65bf65', fontSize: '20px' }}
                />
            );
        }

        if (prevPosition === songNum) {
            return <div className="line-song-item__dash"></div>;
        }
    };

    const renderItem = () => {
        return (
            <div tabIndex={0} className="line-song-item">
                <div className="line-song-item__num-btn">
                    <div className="line-song-item__num">
                        {currentSongData?.song_id === song_id &&
                        playing &&
                        window.innerWidth > 1024 ? (
                            <HiSpeakerWave
                                style={{ color: '#fff', fontSize: '20px' }}
                            />
                        ) : currentSongData?.song_id === song_id &&
                          !playing &&
                          window.innerWidth > 1024 ? (
                            <button className="line-song-item__btn-playing-state">
                                <span className="line-song-item__btn-icon">
                                    <FaPlay className="play-svg" />
                                </span>
                            </button>
                        ) : (
                            songNum
                        )}
                    </div>
                    {((window.innerWidth <= 1024 &&
                        !!prevPosition &&
                        currentSongData?.song_id === song_id) ||
                        (prevPosition &&
                            currentSongData?.song_id !== song_id)) && (
                        <div className="line-song-item__rating">
                            {itemPositionChange()}
                        </div>
                    )}
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
                        aria-label={
                            playing && currentSongData?.song_id === song_id
                                ? `Pause ${name}`
                                : `Play ${name}`
                        }
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
                    onClick={(e) => {
                        handleAddSidebarInfo(
                            e,
                            dispatch,
                            [
                                'line-song-item__info-feat-link',
                                'line-song-item__info-title',
                            ],
                            songData,
                            'Song'
                        );
                    }}
                >
                    <img
                        className="line-song-item__img"
                        src={image || defaultImg}
                        alt={`Cover of ${name}`}
                        width="40"
                        height="40"
                        loading={imgLoading}
                        fetchpriority={imgFetchpriority}
                        decoding="async"
                    />
                    <div className="line-song-item__info">
                        <Link
                            className="line-song-item__info-title"
                            to={`/songs/${id}`}
                            onClick={handleDispatchSingleSongData}
                        >
                            {name}
                        </Link>
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
