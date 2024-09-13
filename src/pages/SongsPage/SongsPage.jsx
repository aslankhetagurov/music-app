import PopularSongsList from '../../components/PopularSongsList/PopularSongsList';
import RecentlyPlayedList from '../../components/RecentlyPlayedList/RecentlyPlayedList';
import './SongsPage.scss';

const SongsPage = () => {
    return (
        <div className="songs-page">
            <PopularSongsList />
            <RecentlyPlayedList />
        </div>
    );
};

export default SongsPage;
