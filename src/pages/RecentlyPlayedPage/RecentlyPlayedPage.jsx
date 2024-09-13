import RecentlyPlayedList from '../../components/RecentlyPlayedList/RecentlyPlayedList';
import './RecentlyPlayedPage.scss';

const RecentlyPlayedPage = () => {
    return (
        <div className="precently-played-page">
            <h1 className="popular-songs-page__title">Recently played</h1>
            <RecentlyPlayedList />
        </div>
    );
};

export default RecentlyPlayedPage;
