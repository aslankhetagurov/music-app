import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from 'react-icons/io';

import { selectCurrentSongsList } from '../../store/slices/generalStateSlice';
import LineSongItem from '../LineSongItem/LineSongItem';
import {
    selectShowPlaybackQueuePopup,
    setShowPlaybackQueuePopup,
} from './store/playbackQueuePopupSlice';
import './PlaybackQueuePopup.scss';

const PlaybackQueuePopup = () => {
    const dispatch = useDispatch();
    const currentSongsList = useSelector(selectCurrentSongsList);
    const showPlaybackQueuePopup = useSelector(selectShowPlaybackQueuePopup);

    const handleClosePlaybackQueue = () => {
        document.body.classList.toggle('scroll-lock');
        dispatch(setShowPlaybackQueuePopup());
    };

    const renderItems = () =>
        currentSongsList.map((data, i) => (
            <LineSongItem
                key={data.song_id}
                songData={data}
                songNum={i + 1}
                handleClosePlaybackQueue={handleClosePlaybackQueue}
            />
        ));

    return (
        <div
            className={`playback-queue-popup  ${
                showPlaybackQueuePopup ? 'playback-queue-popup__show' : ''
            } `}
            role="dialog"
            aria-modal="true"
            aria-labelledby="playback-queue-title"
        >
            <div className="playback-queue-popup__container">
                <div className="playback-queue-popup__head">
                    <h1
                        className="playback-queue-popup__title"
                        id="playback-queue-title"
                    >
                        Playback Queue
                    </h1>
                    <button
                        onClick={handleClosePlaybackQueue}
                        className="playback-queue-popup__close-btn"
                        aria-label="Close playback queue"
                    >
                        <IoMdClose aria-hidden="true" />
                    </button>
                </div>
                {currentSongsList && (
                    <div className="playback-queue-popup__list">
                        <div className="playback-queue-popup__list-inner">
                            {renderItems()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlaybackQueuePopup;
