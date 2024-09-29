import { NavLink } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import { TbMicrophone2 } from 'react-icons/tb';
import { LuMusic } from 'react-icons/lu';
import { LuListMusic } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../store/slices/authSlice';
import './Menu.scss';

const Menu = () => {
    const userInfo = useSelector(selectUserInfo);
    const userCollectionLink = userInfo?.email.split('@')[0];

    return (
        <nav className="menu">
            <ul className="menu__list">
                <li className="menu__item">
                    <NavLink
                        to="."
                        className={({ isActive }) =>
                            isActive
                                ? 'menu__link menu__link-active'
                                : 'menu__link'
                        }
                    >
                        <IoHomeOutline className="menu__item-icon" />
                        Home
                    </NavLink>
                </li>
                <li className="menu__item">
                    <NavLink
                        to="songs"
                        className={({ isActive }) =>
                            isActive
                                ? 'menu__link menu__link-active'
                                : 'menu__link'
                        }
                    >
                        <LuMusic className="menu__item-icon" />
                        Songs
                    </NavLink>
                </li>
                <li className="menu__item">
                    <NavLink
                        to="artists"
                        className={({ isActive }) =>
                            isActive
                                ? 'menu__link menu__link-active'
                                : 'menu__link'
                        }
                    >
                        <TbMicrophone2 className="menu__item-icon" />
                        Artists
                    </NavLink>
                </li>
                <li className="menu__item">
                    <NavLink
                        to={`users/${userCollectionLink}/favorite-songs`}
                        className={({ isActive }) =>
                            isActive
                                ? 'menu__link menu__link-active'
                                : 'menu__link'
                        }
                    >
                        <LuListMusic className="menu__item-icon" />
                        My Collection
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
