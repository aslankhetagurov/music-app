import { useSelector, useDispatch } from 'react-redux';
import { FaPlay, FaPause } from 'react-icons/fa6';

import {
    selectCurrentSong,
    selectPlaying,
} from '../../store/slices/generalStateSlice';
import RenderArtistNames from '../RenderArtistNames/RenderArtistNames';
import LikeBtn from '../LikeBtn/LikeBtn';
import handleSongPlay from '../../utils/handleSongPlay';
import handleAddSidebarInfo from '../Sidebar/utils/handleAddSidebarInfo';
import './SquareSongItem.scss';

const SquareSongItem = ({ handleAddCurrentList, songData }) => {
    const { song_id, image, artist, name } = songData;
    const currentSongData = useSelector(selectCurrentSong);
    const playing = useSelector(selectPlaying);
    const dispatch = useDispatch();

    const renderItem = () => {
        return (
            <div className="song-item">
                <LikeBtn data={songData} itemType="song" />
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
                    onClick={(e) =>
                        handleAddSidebarInfo(
                            e,
                            dispatch,
                            'song-artist-name__item',
                            songData,
                            'Song'
                        )
                    }
                    className="song-item__content-wrapper"
                >
                    <img className="song-item__img" src={image} alt="img" />
                    <div className="song-item__info">
                        <div className="song-item__info-title song-item__info-text">
                            {name}
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
