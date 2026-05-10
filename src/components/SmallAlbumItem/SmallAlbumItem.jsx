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
import defaultImg from '../../assets/default-img.webp';
import RenderArtistNames from '../RenderArtistNames/RenderArtistNames';
import './SmallAlbumItem.scss';

const SmallAlbumItem = ({ albumData }) => {
    const dispatch = useDispatch();
    const currentSongData = useSelector(selectCurrentSong);
    const playing = useSelector(selectPlaying);
    const currentSongsList = useSelector(selectCurrentSongsList);
    const { music } = albumData;
    const isCurrentAlbumPlaying =
        music?.some(
            (songObj) => currentSongData?.song_id === songObj.song_id
        ) &&
        currentSongsList?.every(
            (song, i) => song.song_id === music[i]?.song_id
        );

    const handlePlayAlbum = () => {
        if (isCurrentAlbumPlaying) {
            dispatch(setTogglePlaying());
        } else {
            dispatch(setAddCurrentSong(music[0]));
            handleAddCurrentSongsList(currentSongsList, music);
        }
    };

    const renderContent = () => {
        const { image, name, id, artist } = albumData;

        return (
            <div className="small-album-item">
                <div className="small-album-item__left">
                    <button
                        onClick={handlePlayAlbum}
                        className={`small-album-item__btn ${
                            isCurrentAlbumPlaying
                                ? 'small-album-item__btn-active'
                                : ''
                        }`}
                        aria-label={
                            isCurrentAlbumPlaying && playing
                                ? `Pause ${name} album`
                                : `Play ${name} album`
                        }
                    >
                        <div className="small-album-item__btn-icon">
                            {playing && isCurrentAlbumPlaying ? (
                                <FaPause />
                            ) : (
                                <FaPlay className="play-svg" />
                            )}
                        </div>
                    </button>
                    <img
                        className="small-album-item__img"
                        src={image || defaultImg}
                        alt="album image"
                    />
                </div>
                <div className="small-album-item__info">
                    <Link
                        className="small-album-item__title"
                        to={`/albums/${id}`}
                    >
                        {name}
                    </Link>
                    <div className="small-album-item__artist">
                        {artist && <RenderArtistNames names={artist} />}
                    </div>
                </div>
                <LikeBtn data={albumData} itemType="album" />
            </div>
        );
    };

    return albumData && renderContent();
};

export default SmallAlbumItem;
