import CurrentArtist from '../../components/CurrentArtist/CurrentArtist';
import { Outlet } from 'react-router-dom';

const CurrentArtistPage = () => {
    return (
        <>
            <CurrentArtist />
            <Outlet />
        </>
    );
};

export default CurrentArtistPage;
