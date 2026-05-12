import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaPlay, FaPause } from 'react-icons/fa6';

import {
    selectCurrentSong,
    selectPlaying,
} from '../../store/slices/generalStateSlice';
import RenderArtistNames from '../RenderArtistNames/RenderArtistNames';
import LikeBtn from '../LikeBtn/LikeBtn';
import handleSongPlay from '../../utils/handleSongPlay';
import handleAddSidebarInfo from '../Sidebar/utils/handleAddSidebarInfo';
import defaultImg from '../../assets/default-img.webp';
import { setAddSingleSongData } from '../SingleSong/store/singleSongSlice';
import './SquareSongItem.scss';

const SquareSongItem = ({
    handleAddCurrentList,
    songData,
    imgLoading = 'lazy',
    imgFetchpriority = 'low',
}) => {
    const { song_id, image, artist, name, id } = songData;
    const currentSongData = useSelector(selectCurrentSong);
    const playing = useSelector(selectPlaying);
    const dispatch = useDispatch();

    const handleDispatchSingleSongData = () => {
        dispatch(setAddSingleSongData(songData));
    };

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
                    aria-label={
                        playing && currentSongData?.song_id === song_id
                            ? `Pause ${name}`
                            : `Play ${name}`
                    }
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
                            ['artist-name__item', 'song-item__info-title'],
                            songData,
                            'Song'
                        )
                    }
                    className="song-item__content-wrapper"
                >
                    <img
                        className="song-item__img"
                        src={image || defaultImg}
                        alt={`Cover of ${name}`}
                        width="115"
                        height="115"
                        decoding="async"
                        loading={imgLoading}
                        fetchpriority={imgFetchpriority}
                    />
                    <div className="song-item__info">
                        <Link
                            className="song-item__info-title"
                            to={`/songs/${id}`}
                            onClick={handleDispatchSingleSongData}
                        >
                            {name}
                        </Link>

                        {artist && <RenderArtistNames names={artist} />}
                    </div>
                </div>
            </div>
        );
    };

    return songData && renderItem();
};

export default SquareSongItem;
