import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaPause, FaPlay } from 'react-icons/fa6';

import {
    selectSingleAlbumInfo,
    selectSingleAlbumSongs,
} from '../../../pages/SingleAlbumPage/store/singleAlbumSlice';
import defaultImg from '../../../assets/default-img.webp';
import {
    selectCurrentSong,
    selectCurrentSongsList,
    selectPlaying,
    setAddCurrentSong,
    setTogglePlaying,
} from '../../../store/slices/generalStateSlice';
import handleAddCurrentSongsList from '../../../utils/handleAddCurrentSongsList';
import LikeBtn from '../../LikeBtn/LikeBtn';
import ShareBtn from '../../ShareBtn/ShareBtn';
import './SingleAlbumMain.scss';

const SingleAlbumMain = () => {
    const dispatch = useDispatch();
    const singleAlbumInfo = useSelector(selectSingleAlbumInfo);
    const singleAlbumSongs = useSelector(selectSingleAlbumSongs);
    const currentSongData = useSelector(selectCurrentSong);
    const currentSongsList = useSelector(selectCurrentSongsList);
    const playing = useSelector(selectPlaying);

    const renderContent = () => {
        const { image, name, main_artist, artist, year, genre } =
            singleAlbumInfo;

        const handleAudio = () => {
            if (
                singleAlbumSongs.some(
                    (songObj) => currentSongData?.song_id === songObj.song_id
                ) &&
                currentSongsList?.every(
                    (song, i) => song.song_id === singleAlbumSongs[i].song_id
                )
            ) {
                dispatch(setTogglePlaying());
            } else {
                dispatch(setAddCurrentSong(singleAlbumSongs[0]));
                handleAddCurrentSongsList(currentSongsList, singleAlbumSongs);
            }
        };

        return (
            <section className="single-album">
                <img className="single-album__img" src={image || defaultImg} />
                <div className="single-album__main">
                    <div className="single-album__info">
                        <span className="single-album__label">Album</span>
                        <h1 className="single-album__title">{name}</h1>
                        <div className="single-album__more-info">
                            <div className="single-album__artist">
                                <Link to={`/artists/${main_artist}/songs`}>
                                    {artist}
                                </Link>
                            </div>
                            <span className="single-album__sep">*</span>
                            <div className="single-album__year">{year}</div>
                            <span className="single-album__sep">*</span>
                            <div className="single-album__genre">{genre}</div>
                        </div>
                    </div>
                    <div className="single-album__btns">
                        <button
                            className="single-album__play-btn"
                            onClick={handleAudio}
                        >
                            {playing &&
                            singleAlbumSongs?.some(
                                (song) =>
                                    currentSongData?.song_id === song.song_id
                            ) &&
                            currentSongsList?.every(
                                (song, i) =>
                                    song.name === singleAlbumSongs[i].name
                            ) ? (
                                <FaPause />
                            ) : (
                                <FaPlay className="play-svg" />
                            )}
                        </button>

                        <LikeBtn data={singleAlbumInfo} itemType="album" />

                        <ShareBtn />
                    </div>
                </div>
            </section>
        );
    };

    return !!singleAlbumInfo && renderContent();
};

export default SingleAlbumMain;
