import PopularSongsList from '../../components/PopularSongsList/PopularSongsList';
import './PopularSongsPage.scss';

const PopularSongsPage = () => {
    return (
        <div className="popular-songs-page">
            <h1 className="popular-songs-page__title">Popular Songs</h1>
            <PopularSongsList />
        </div>
    );
};

export default PopularSongsPage;
