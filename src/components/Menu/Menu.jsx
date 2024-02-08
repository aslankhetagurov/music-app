import { NavLink } from 'react-router-dom';

const Menu = () => {
    return (
        <nav className="menu">
            <ul className="menu__list">
                <li className="menu__item">
                    <NavLink
                        to="."
                        className={({ isActive }) =>
                            isActive ? 'menu__link-active' : 'menu__link'
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li className="menu__item">
                    <NavLink
                        to="songs"
                        className={({ isActive }) =>
                            isActive ? 'menu__link-active' : 'menu__link'
                        }
                    >
                        Songs
                    </NavLink>
                </li>
                <li className="menu__item">
                    <NavLink
                        to="artists"
                        className={({ isActive }) =>
                            isActive ? 'menu__link-active' : 'menu__link'
                        }
                    >
                        Artists
                    </NavLink>
                </li>
                <li className="menu__item">
                    <NavLink
                        to="albums"
                        className={({ isActive }) =>
                            isActive ? 'menu__link-active' : 'menu__link'
                        }
                    >
                        Albums
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
