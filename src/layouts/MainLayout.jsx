import { Outlet } from 'react-router-dom';

import Menu from '../components/Menu/Menu';
import Header from '../components/Header/Header';
import CurrentSongPlayer from '../components/Player/CurrentSongPlayer';
import Sidebar from '../components/Sidebar/Sidebar';
import PlaybackQueuePopup from '../components/PlaybackQueuePopup/PlaybackQueuePopup';
import './MainLayout.scss';

const MainLayout = () => {
    return (
        <main className="main">
            <Menu />
            <Header />
            <div className="main__content">
                <Outlet />
                <Sidebar />
            </div>
            <CurrentSongPlayer />
            <PlaybackQueuePopup />
        </main>
    );
};

export default MainLayout;
