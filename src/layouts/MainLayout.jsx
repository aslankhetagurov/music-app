import { Outlet } from 'react-router-dom';
import Menu from '../components/Menu/Menu';
import './MainLayout.scss';

const MainLayout = () => {
    return (
        <div className="main">
            <Menu />
            <Outlet />
        </div>
    );
};

export default MainLayout;
