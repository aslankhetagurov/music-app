import { useSelector } from 'react-redux';

import { selectCurrentSongsList } from '../../../store/slices/generalStateSlice';
import { selectSingleAlbumSongs } from '../../../pages/SingleAlbumPage/store/singleAlbumSlice';
import LineSongItem from '../../LineSongItem/LineSongItem';
import handleAddCurrentSongsList from '../../../utils/handleAddCurrentSongsList';

const SingleAlbumSongsList = () => {
    const currentSongslist = useSelector(selectCurrentSongsList);
    const singleAlbumSongs = useSelector(selectSingleAlbumSongs);

    const renderItems = () => {
        return (
            <div className="single-album__songs">
                <div className="single-album__songs-list">
                    {singleAlbumSongs.map((data, i) => {
                        return (
                            <LineSongItem
                                key={data.song_id}
                                songData={data}
                                handleAddCurrentList={() =>
                                    handleAddCurrentSongsList(
                                        currentSongslist,
                                        singleAlbumSongs
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

    return !!singleAlbumSongs && renderItems();
};

export default SingleAlbumSongsList;
