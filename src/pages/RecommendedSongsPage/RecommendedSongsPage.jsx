import RecommendedSongsList from '../../components/RecommendedSongsList/RecommendedSongsList';
import './RecommendedSongsPage.scss';

const RecommendedSongsPage = () => {
    return (
        <div className="recommended-songs-page">
            <h1 className="recommended-songs-page__title">
                Recommended for you
            </h1>
            <RecommendedSongsList />
        </div>
    );
};

export default RecommendedSongsPage;
