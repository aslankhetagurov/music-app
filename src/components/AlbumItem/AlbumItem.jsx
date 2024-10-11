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

    const handleAudio = () => {
        if (
            music.some(
                (songObj) => currentSongData?.song_id === songObj.song_id
            ) &&
            currentSongsList?.every(
                (song, i) => song.song_id === music[i].song_id
            )
        ) {
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
                        music?.some(
                            (song) => currentSongData?.song_id === song.song_id
                        ) &&
                        currentSongsList?.every(
                            (song, i) => song.song_id === music[i].song_id
                        )
                            ? 'album-item__btn_active'
                            : ''
                    }`}
                >
                    <span className="album-item__btn-circle">
                        {playing &&
                        music?.some(
                            (song) => currentSongData?.song_id === song.song_id
                        ) &&
                        currentSongsList?.every(
                            (song, i) => song.song_id === music[i].song_id
                        ) ? (
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
                        alt="img"
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
