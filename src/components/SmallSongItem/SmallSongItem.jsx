import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaPause, FaPlay } from 'react-icons/fa6';

import {
    selectCurrentSong,
    selectPlaying,
    setAddCurrentSong,
    setTogglePlaying,
} from '../../store/slices/generalStateSlice';
import RenderArtistNames from '../RenderArtistNames/RenderArtistNames';
import LikeBtn from '../LikeBtn/LikeBtn';
import { setAddSingleSongData } from '../SingleSong/store/singleSongSlice';
import defaultImg from '../../assets/default-img.webp';
import './SmallSongItem.scss';

const SmallSongItem = ({ songData }) => {
    const dispatch = useDispatch();
    const currentSongData = useSelector(selectCurrentSong);
    const playing = useSelector(selectPlaying);

    const handleAudio = () => {
        if (currentSongData?.song_id !== songData.song_id) {
            dispatch(setAddCurrentSong(songData));
        }
        if (currentSongData?.song_id === songData.song_id) {
            dispatch(setTogglePlaying());
        }
    };

    const handleDispatchSingleSongData = () => {
        dispatch(setAddSingleSongData(songData));
    };

    const renderContent = () => {
        const { song_id, image, name, artist, id } = songData;

        return (
            <div className="small-song-item">
                <div className="small-song-item__left">
                    <button
                        onClick={handleAudio}
                        className={`small-song-item__btn ${
                            currentSongData?.song_id === song_id
                                ? 'small-song-item__btn-active'
                                : ''
                        }`}
                    >
                        <div className="small-song-item__btn-icon">
                            {playing && currentSongData?.song_id === song_id ? (
                                <FaPause />
                            ) : (
                                <FaPlay className="play-svg" />
                            )}
                        </div>
                    </button>
                    <img
                        className="small-song-item__img"
                        src={image || defaultImg}
                        alt="song image"
                    />
                </div>
                <div className="small-song-item__main">
                    <Link
                        className="small-song-item__title"
                        to={`/songs/${id}`}
                        onClick={handleDispatchSingleSongData}
                    >
                        {name}
                    </Link>
                    <div className="small-song-item__artist">
                        {artist && <RenderArtistNames names={artist} />}
                    </div>
                </div>
                <LikeBtn data={songData} itemType="song" />
            </div>
        );
    };

    return songData && renderContent();
};

export default SmallSongItem;
