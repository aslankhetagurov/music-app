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
import {
    setAddSidebarInfo,
    setAddSidebarInfoType,
    setAddSidebarList,
} from '../Sidebar/store/sidebarSlice';
import RenderArtistNames from '../RenderArtistNames/RenderArtistNames';
import defaultImg from '../../assets/default-img.webp';
import LikeBtn from '../LikeBtn/LikeBtn';
import handleAddCurrentSongsList from '../../utils/handleAddCurrentSongsList';
import handleAddSidebarInfo from '../Sidebar/utils/handleAddSidebarInfo';
import './AlbumItem.scss';

const AlbumItem = ({ albumData }) => {
    const { image, artist, name, id } = albumData;
    const currentSongData = useSelector(selectCurrentSong);
    const currentSongsList = useSelector(selectCurrentSongsList);
    const playing = useSelector(selectPlaying);
    const dispatch = useDispatch();
    const { music } = albumData;

    const isActiveAlbum =
        currentSongsList?.length === music.length &&
        music.some((song) => currentSongData?.song_id === song.song_id) &&
        currentSongsList.every((song, i) => song.song_id === music[i]?.song_id);

    const handleAudio = () => {
        if (!music || !Array.isArray(music) || music.length === 0) {
            return;
        }

        if (isActiveAlbum) {
            dispatch(setTogglePlaying());
        } else {
            dispatch(setAddCurrentSong(music[0]));
            handleAddCurrentSongsList(currentSongsList, music);
            dispatch(setAddSidebarList(music));
            dispatch(setAddSidebarInfo(albumData));
            dispatch(setAddSidebarInfoType('Album'));
        }
    };

    const renderItem = () => {
        return (
            <div className="album-item">
                <LikeBtn data={albumData} itemType="album" />
                <button
                    onClick={handleAudio}
                    className={`album-item__btn ${
                        isActiveAlbum ? 'album-item__btn_active' : ''
                    }`}
                    aria-label={
                        isActiveAlbum && playing
                            ? `Pause ${name} album`
                            : `Play ${name} album`
                    }
                >
                    <span className="album-item__btn-circle">
                        {playing && isActiveAlbum ? (
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
                            ['artist-name__item', 'album-item__info-title'],
                            albumData,
                            'Album',
                            music
                        )
                    }
                    className="album-item__content-wrapper"
                >
                    <img
                        className="album-item__img"
                        src={image || defaultImg}
                        alt={`${name} album cover by ${artist[0]}`}
                        width="115"
                        height="115"
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="album-item__info">
                        <Link
                            className="album-item__info-title"
                            to={`/albums/${id}`}
                        >
                            {name}
                        </Link>
                        {<RenderArtistNames names={artist} />}
                    </div>
                </div>
            </div>
        );
    };

    return albumData && renderItem();
};

export default AlbumItem;
