import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaPause, FaPlay } from 'react-icons/fa6';

import {
    selectCurrentSong,
    selectCurrentSongsList,
    selectPlaying,
    setAddCurrentSong,
    setTogglePlaying,
} from '../../store/slices/generalStateSlice';
import handleAddCurrentSongsList from '../../utils/handleAddCurrentSongsList';
import LikeBtn from '../LikeBtn/LikeBtn';
import './SmallArtistItem.scss';

const SmallArtistItem = ({ artistInfo }) => {
    const dispatch = useDispatch();
    const currentSongData = useSelector(selectCurrentSong);
    const playing = useSelector(selectPlaying);
    const currentSongsList = useSelector(selectCurrentSongsList);
    const { music } = artistInfo;

    const handleAudio = (firstSong) => {
        if (
            music.some(
                (songObj) => currentSongData?.song_id === songObj.song_id
            )
        ) {
            dispatch(setTogglePlaying());
        } else {
            dispatch(setAddCurrentSong(firstSong));
        }

        handleAddCurrentSongsList(currentSongsList, music);
    };

    const renderContent = () => {
        const { image, name } = artistInfo;

        return (
            <div className="small-artist-item">
                <div className="small-artist-item__left">
                    <button
                        onClick={() => handleAudio(music[0])}
                        className={`small-artist-item__btn ${
                            currentSongData?.main_artist === name
                                ? 'small-artist-item__btn-active'
                                : ''
                        }`}
                    >
                        <div className="small-artist-item__btn-icon">
                            {playing &&
                            currentSongData?.main_artist === name ? (
                                <FaPause />
                            ) : (
                                <FaPlay className="play-svg" />
                            )}
                        </div>
                    </button>
                    <img
                        className="small-artist-item__img"
                        src={image}
                        alt="artist image"
                    />
                </div>
                <div className="small-artist-item__artist">
                    <Link
                        className="small-artist-item__artist-name"
                        to={`/artists/${name}/songs`}
                    >
                        {name}
                    </Link>
                </div>
                <LikeBtn data={artistInfo} itemType="artist" />
            </div>
        );
    };

    return artistInfo && renderContent();
};

export default SmallArtistItem;
