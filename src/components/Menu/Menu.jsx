import { NavLink } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
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
                        aria-label="Go to homepage"
                    >
                        <IoHomeOutline
                            className="menu__item-icon"
                            aria-hidden="true"
                        />
                        Home
                    </NavLink>
                </li>
                {userInfo && (
                    <li className="menu__item">
                        <NavLink
                            to={`users/${userCollectionLink}`}
                            className={({ isActive }) =>
                                isActive
                                    ? 'menu__link menu__link-active'
                                    : 'menu__link'
                            }
                            aria-label="Go to my collection"
                        >
                            <LuListMusic
                                className="menu__item-icon"
                                aria-hidden="true"
                            />
                            My Collection
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Menu;
