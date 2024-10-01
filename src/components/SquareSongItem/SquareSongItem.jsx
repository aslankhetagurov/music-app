import { useSelector, useDispatch } from 'react-redux';
import { FaPlay, FaPause } from 'react-icons/fa6';

import {
    setAddCurrentSong,
    setTogglePlaying,
    selectCurrentSong,
    selectPlaying,
} from '../../store/slices/generalStateSlice';
import RenderArtistNames from '../RenderArtistNames/RenderArtistNames';
import {
    setAddSidebarInfo,
    setToggleShowSidebar,
} from '../Sidebar/store/sidebarSlice';

import './SquareSongItem.scss';
import LikeBtn from '../LikeBtn/LikeBtn';

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

    const handleAddSidebarInfo = (evt) => {
        if (evt.target.className !== 'song-artist-name__item') {
            dispatch(setAddSidebarInfo(songData));
            dispatch(setToggleShowSidebar(true));
        }
    };

    const renderItem = () => {
        return (
            <div className="song-item">
                <LikeBtn data={songData} itemType="song" />
                <button
                    onClick={handleAudio}
                    className={`song-item__btn ${
                        currentSongData?.song_id === song_id
                            ? 'song-item__btn_active'
                            : ''
                    }`}
                >
                    <span className="song-item__btn-circle">
                        {playing && currentSongData?.song_id === song_id ? (
                            <FaPause />
                        ) : (
                            <FaPlay className="play-svg" />
                        )}
                    </span>
                </button>
                <div
                    onClick={handleAddSidebarInfo}
                    className="song-item__content-wrapper"
                >
                    <img className="song-item__img" src={image} alt="img" />
                    <div className="song-item__info">
                        <div className="song-item__info-title song-item__info-text">
                            {title}
                        </div>
                        {artist && <RenderArtistNames names={artist} />}
                    </div>
                </div>
            </div>
        );
    };

    return songData && renderItem();
};

export default SquareSongItem;
