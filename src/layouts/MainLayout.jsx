import { Outlet } from 'react-router-dom';
import Menu from '../components/Menu/Menu';
import './MainLayout.scss';
import Header from '../components/Header/Header';
import CurrentSongPlayer from '../components/Player/CurrentSongPlayer';

const MainLayout = () => {
    return (
        <div className="main">
            <Menu />
            <div className="main__content">
                <Header />
                <Outlet />
            </div>
            <CurrentSongPlayer />
        </div>
    );
};

export default MainLayout;
