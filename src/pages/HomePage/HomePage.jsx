import PopularSongsList from '../../components/PopularSongsList/PopularSongsList';
import PopularArtistsList from '../../components/PopularArtistsList/PopularArtistsList';
import RecentlyPlayedList from '../../components/RecentlyPlayedList/RecentlyPlayedList';
import './HomePage.scss';

const HomePage = () => {
    return (
        <div className="home-page">
            <PopularSongsList />
            <PopularArtistsList />
            <RecentlyPlayedList />
        </div>
    );
};

export default HomePage;
