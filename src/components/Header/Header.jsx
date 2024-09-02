import { Link } from 'react-router-dom';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar.png';
import supabase from '../../../supabaseClient';
import { selectUserInfo, setAddUserInfo } from '../../store/slices/authSlice';
import './Header.scss';

const Header = () => {
    const [inputValue, setInputValue] = useState('');
    const [userMenu, setUserMenu] = useState(false);

    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);

    useEffect(() => {
        userMenu &&
            document.addEventListener(
                'click',
                handleCloseUserMenuByOtsideClick
            );
        return () => {
            document.removeEventListener(
                'click',
                handleCloseUserMenuByOtsideClick
            );
        };
        // eslint-disable-next-line
    }, [userMenu]);

    const handleInputValue = (e) => {
        setInputValue(e.target.value);
    };

    const handleLogOut = async () => {
        let { error } = await supabase.auth.signOut();
        error && console.log(error);
        !error && dispatch(setAddUserInfo(null));
    };

    const handleUserMenu = () => {
        setUserMenu(!userMenu);
    };

    const handleCloseUserMenuByOtsideClick = (e) => {
        if (e.target.className !== 'header__avatar') {
            setUserMenu(!userMenu);
        }
    };

    const usernameFromEmail = userInfo?.email.split('@')[0];

    return (
        <header className="header">
            <Link className="header__logo" to=".">
                <img className="header__logo-img" src={logo} alt="logo" />
            </Link>
            <div className="header__search">
                <div className="header__search-img">
                    <IoMdSearch />
                </div>
                <input
                    className="header__search-input"
                    placeholder="Search by title, artist, or album..."
                    type="text"
                    value={inputValue}
                    onChange={handleInputValue}
                />
            </div>
            {userInfo ? (
                <div
                    className="header__user"
                    onClick={handleUserMenu}
                    title={usernameFromEmail}
                >
                    <img className="header__avatar" src={avatar} alt="avatar" />
                    <div
                        className={`header__user-menu ${
                            userMenu ? 'header__user-menu-show' : ''
                        }`}
                    >
                        <div className="header__user-menu-top">
                            <button
                                onClick={handleUserMenu}
                                className="header__close-btn"
                            >
                                <IoMdClose />
                            </button>
                            <span className="header__username">
                                {usernameFromEmail}
                            </span>
                        </div>
                        <button
                            className="header__logout-btn"
                            onClick={handleLogOut}
                        >
                            log out
                        </button>
                    </div>
                </div>
            ) : (
                <div className="header__auth">
                    <div className="header__auth-links">
                        <Link className="header__auth-link" to="/signup">
                            Sign Up
                        </Link>
                        <Link
                            className="header__auth-link header__auth-login"
                            to="/login"
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};
export default Header;
