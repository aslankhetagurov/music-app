import { NavLink } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import { TbMicrophone2 } from 'react-icons/tb';
import { RiFolderMusicLine } from 'react-icons/ri';
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
                        <IoHomeOutline style={{ marginRight: '20px' }} />
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
                        <LuMusic style={{ marginRight: '20px' }} />
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
                        <TbMicrophone2 style={{ marginRight: '20px' }} />
                        Artists
                    </NavLink>
                </li>
                <li className="menu__item">
                    <NavLink
                        to="albums"
                        className={({ isActive }) =>
                            isActive
                                ? 'menu__link menu__link-active'
                                : 'menu__link'
                        }
                    >
                        <RiFolderMusicLine style={{ marginRight: '20px' }} />
                        Albums
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
