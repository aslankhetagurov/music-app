import PopularAlbumsList from '../../components/PopularAlbumsList/PopularAlbumsList';
import './PopularAlbumsPage.scss';

const PopularAlbumsPage = () => {
    return (
        <div className="popular-albums-page">
            <h1 className="popular-albums-page__title">Popular Artists</h1>
            <PopularAlbumsList />
        </div>
    );
};

export default PopularAlbumsPage;
