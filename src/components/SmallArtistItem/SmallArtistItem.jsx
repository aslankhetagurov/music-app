import { useEffect, useState } from 'react';
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
import supabase from '../../../supabaseClient';
import { setAddAlertText, setAddAlertType } from '../Alert/store/alertSlice';
import LikeBtn from '../LikeBtn/LikeBtn';
import './SmallArtistItem.scss';

const SmallArtistItem = ({ artistInfo }) => {
    const dispatch = useDispatch();
    const currentSongData = useSelector(selectCurrentSong);
    const playing = useSelector(selectPlaying);
    const currentSongsList = useSelector(selectCurrentSongsList);
    const [artistSongs, setArtistSongs] = useState(null);

    const fetchSongs = async (artistName) => {
        try {
            const { data: currentArtistSongs, error } = await supabase
                .from('music')
                .select()
                .contains('artist', [artistName]);

            if (error) {
                dispatch(setAddAlertText(error.message));
                dispatch(setAddAlertType('error'));
            }

            currentArtistSongs && setArtistSongs(currentArtistSongs);
        } catch (error) {
            dispatch(setAddAlertText(error.message));
            dispatch(setAddAlertType('error'));
        }
    };

    useEffect(
        () => {
            artistInfo && fetchSongs(artistInfo.name);
        }, // eslint-disable-next-line
        [artistInfo]
    );

    const handleAudio = (firstSong) => {
        if (
            artistSongs.some(
                (songObj) => currentSongData?.song_id === songObj.song_id
            )
        ) {
            dispatch(setTogglePlaying());
        } else {
            dispatch(setAddCurrentSong(firstSong));
        }

        handleAddCurrentSongsList(currentSongsList, artistSongs);
    };

    const renderContent = () => {
        const { image, name } = artistInfo;

        return (
            <div className="small-artist-item">
                <div className="small-artist-item__left">
                    <button
                        onClick={() => handleAudio(artistSongs[0])}
                        className={`small-artist-item__btn ${
                            currentSongData?.artist.includes(name)
                                ? 'small-artist-item__btn-active'
                                : ''
                        }`}
                    >
                        <div className="small-artist-item__btn-icon">
                            {playing &&
                            currentSongData?.artist.includes(name) ? (
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
                        to={`/artists/${name}/artistSongs`}
                    >
                        {name}
                    </Link>
                </div>
                <LikeBtn data={artistInfo} />
            </div>
        );
    };

    return artistInfo && renderContent();
};

export default SmallArtistItem;
