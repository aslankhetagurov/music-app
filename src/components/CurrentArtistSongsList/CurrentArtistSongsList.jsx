import { useSelector } from 'react-redux';

import { selectCurrentSongsList } from '../../store/slices/generalStateSlice';
import LineSongItem from '../LineSongItem/LineSongItem';
import handleAddCurrentList from '../../utils/handleAddCurrentSongsList';
import { selectCurrentArtistSongs } from '../CurrentArtist/store/currentArtistSlice';

import './CurrentArtistSongsList.scss';

const CurrentArtistSongsList = () => {
    const currentSongslist = useSelector(selectCurrentSongsList);
    const artistSongs = useSelector(selectCurrentArtistSongs);

    const renderItems = () => {
        return (
            <div className="current-artist-songs">
                <h1 className="current-artist-songs__title">Songs</h1>
                <div className="current-artist-songs__list">
                    {artistSongs.map((data, i) => {
                        return (
                            <LineSongItem
                                key={data.song_id}
                                songData={data}
                                handleAddCurrentList={() =>
                                    handleAddCurrentList(
                                        currentSongslist,
                                        artistSongs
                                    )
                                }
                                songNum={i + 1}
                            />
                        );
                    })}
                </div>
            </div>
        );
    };

    return artistSongs && renderItems();
};

export default CurrentArtistSongsList;
