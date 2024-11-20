import PopularSongsList from '../../components/PopularSongsList/PopularSongsList';
import PopularArtistsList from '../../components/PopularArtistsList/PopularArtistsList';
import RecentlyPlayedList from '../../components/RecentlyPlayedList/RecentlyPlayedList';
import PopularAlbumsList from '../../components/PopularAlbumsList/PopularAlbumsList';
import NewReleasesList from '../../components/NewReleasesList/NewReleasesList';
import RecommendedSongsList from '../../components/RecommendedSongsList/RecommendedSongsList';
import './HomePage.scss';

const HomePage = () => {
    return (
        <div className="home-page">
            <NewReleasesList />
            <RecentlyPlayedList />
            <RecommendedSongsList />
            <PopularSongsList />
            <PopularArtistsList />
            <PopularAlbumsList />
        </div>
    );
};

export default HomePage;
