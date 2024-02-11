import { Outlet } from 'react-router-dom';
import Menu from '../components/Menu/Menu';
import './MainLayout.scss';
import Header from '../components/Header/Header';

const MainLayout = () => {
    return (
        <div className="main">
            <Menu />
            <div className="main__content">
                <Header />
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
