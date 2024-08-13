import { Outlet } from 'react-router-dom';
import Menu from '../components/Menu/Menu';
import './MainLayout.scss';
import Header from '../components/Header/Header';
import CurrentSongPlayer from '../components/Player/CurrentSongPlayer';
import Sidebar from '../components/Sidebar/Sidebar';

const MainLayout = () => {
    return (
        <div className="main">
            <Menu />
            <Header />
            <div className="main__content">
                <Outlet />
                <Sidebar />
            </div>
            <CurrentSongPlayer />
        </div>
    );
};

export default MainLayout;
