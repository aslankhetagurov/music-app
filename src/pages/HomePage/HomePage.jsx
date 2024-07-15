import PopularSongsList from '../../components/PopularSongsList/PopularSongsList';
import PopularArtistsList from '../../components/PopularArtistsList/PopularArtistsList';

import './HomePage.scss';

const HomePage = () => {
    return (
        <div className="main-page">
            <PopularSongsList />
            <PopularArtistsList />
        </div>
    );
};

export default HomePage;
