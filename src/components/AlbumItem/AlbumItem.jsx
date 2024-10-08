import { useState } from 'react';
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
import supabase from '../../../supabaseClient';
import { setAddAlertText, setAddAlertType } from '../Alert/store/alertSlice';
import handleAddCurrentSongsList from '../../utils/handleAddCurrentSongsList';
import handleAddSidebarInfo from '../Sidebar/utils/handleAddSidebarInfo';
import './AlbumItem.scss';

const AlbumItem = ({ albumData }) => {
    const { image, artist, name, id } = albumData;
    const [albumSongs, setAlbumSongs] = useState(null);
    const currentSongData = useSelector(selectCurrentSong);
    const currentSongsList = useSelector(selectCurrentSongsList);
    const playing = useSelector(selectPlaying);
    const dispatch = useDispatch();

    useState(() => {
        (async () => {
            try {
                let { data: albumSongs, error } = await supabase
                    .from('music')
                    .select('*, albums(*)')
                    .eq('album', name);

                if (error) {
                    dispatch(setAddAlertText(error.message));
                    dispatch(setAddAlertType('error'));
                }

                setAlbumSongs(albumSongs);
            } catch (error) {
                dispatch(setAddAlertText(error.message));
                dispatch(setAddAlertType('error'));
            }
        })();
    }, []);

    const handleAudio = () => {
        if (
            albumSongs.some(
                (songObj) => currentSongData?.song_id === songObj.song_id
            ) &&
            currentSongsList?.every(
                (song, i) => song.song_id === albumSongs[i].song_id
            )
        ) {
            dispatch(setTogglePlaying());
        } else {
            dispatch(setAddCurrentSong(albumSongs[0]));
            handleAddCurrentSongsList(currentSongsList, albumSongs);
            dispatch(setAddSidebarList(albumSongs));
            dispatch(setAddSidebarInfo(albumData));
            dispatch(setAddSidebarInfoType('Album'));
        }
    };

    const renderItem = () => {
        return (
            <div className="album-item">
                <LikeBtn data={albumData} itemType="song" />
                <button
                    onClick={handleAudio}
                    className={`album-item__btn ${
                        albumSongs?.some(
                            (song) => currentSongData?.song_id === song.song_id
                        ) &&
                        currentSongsList?.every(
                            (song, i) => song.song_id === albumSongs[i].song_id
                        )
                            ? 'album-item__btn_active'
                            : ''
                    }`}
                >
                    <span className="album-item__btn-circle">
                        {playing &&
                        albumSongs?.some(
                            (song) => currentSongData?.song_id === song.song_id
                        ) &&
                        currentSongsList?.every(
                            (song, i) => song.song_id === albumSongs[i].song_id
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
                            albumSongs
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
                            to={`albums/${id}`}
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
