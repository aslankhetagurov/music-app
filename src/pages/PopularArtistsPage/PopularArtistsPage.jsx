import PopularArtistsList from '../../components/PopularArtistsList/PopularArtistsList';

import './PopularArtistsPage.scss';

const PopularArtistsPage = () => {
    return (
        <div className="popular-artists-page">
            <div className="popular-artists-page__top">
                <h2 className="popular-artists-page__top-title">
                    Popular Artists
                </h2>
            </div>
            <PopularArtistsList />
        </div>
    );
};

export default PopularArtistsPage;
