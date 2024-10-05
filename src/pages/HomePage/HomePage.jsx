import PopularSongsList from '../../components/PopularSongsList/PopularSongsList';
import PopularArtistsList from '../../components/PopularArtistsList/PopularArtistsList';
import RecentlyPlayedList from '../../components/RecentlyPlayedList/RecentlyPlayedList';
import PopularAlbumsList from '../../components/PopularAlbumsList/PopularAlbumsList';
import './HomePage.scss';

const HomePage = () => {
    return (
        <div className="home-page">
            <PopularSongsList />
            <PopularArtistsList />
            <RecentlyPlayedList />
            <PopularAlbumsList />
        </div>
    );
};

export default HomePage;
