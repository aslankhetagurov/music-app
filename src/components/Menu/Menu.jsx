import { NavLink } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import { TbMicrophone2 } from 'react-icons/tb';
import { LuMusic } from 'react-icons/lu';
import './Menu.scss';

const Menu = () => {
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
            </ul>
        </nav>
    );
};

export default Menu;
