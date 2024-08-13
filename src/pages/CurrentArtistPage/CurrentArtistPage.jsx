import CurrentArtist from '../../components/CurrentArtist/CurrentArtist';
import { Outlet } from 'react-router-dom';

import './CurrentArtistPage.scss';

const CurrentArtistPage = () => {
    return (
        <div className="current-artist-page">
            <CurrentArtist />
            <Outlet />
        </div>
    );
};

export default CurrentArtistPage;
