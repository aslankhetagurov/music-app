import { Outlet } from 'react-router-dom';

import UserCollectionMain from '../../components/UserCollection/UserCollectionMain/UserCollectionMain';
import './UserCollectionPage.scss';

const UserCollectionPage = () => {
    return (
        <div className="user-collection-page">
            <UserCollectionMain />
            <Outlet />
        </div>
    );
};

export default UserCollectionPage;
