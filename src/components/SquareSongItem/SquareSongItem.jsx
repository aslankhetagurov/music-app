import { Link } from 'react-router-dom';
import { FaPlay, FaPause } from 'react-icons/fa6';
import './SquareSongItem.scss';
import { useEffect, useMemo, useState } from 'react';

const SquareSongItem = ({ songData }) => {
    const [playing, setPlaying] = useState(false);

    const song = useMemo(() => {
        return new Audio(songData.link);
    }, []);

    useEffect(() => {
        song.addEventListener('ended', () => {
            setPlaying(!playing);
        });

        return () => {
            song.removeEventListener('ended', () => {
                setPlaying(!playing);
            });
        };
    }, [playing]);

    const handleAudio = () => {
        playing ? song.pause() : song.play();
        setPlaying(!playing);
    };

    const renderItem = ({ image, artist, title }) => {
        return (
            <div tabIndex={0} className="song-item">
                <div className="song-item__wrapper">
                    <div className="song-item__top">
                        <img className="song-item__img" src={image} alt="img" />
                        <button
                            tabIndex={0}
                            onClick={handleAudio}
                            className={`song-item__btn ${
                                playing ? 'song-item__btn_active' : ''
                            }`}
                        >
                            <span className="song-item__btn-circle">
                                {playing ? <FaPause /> : <FaPlay />}
                            </span>
                        </button>
                    </div>
                    <div className="song-item__info">
                        <div className="song-item__title">{title}</div>
                        <Link className="song-item__artist">{artist}</Link>
                    </div>
                </div>
            </div>
        );
    };

    const item = renderItem(songData);

    return item;
};

export default SquareSongItem;
