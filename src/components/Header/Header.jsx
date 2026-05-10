import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar.png';
import supabase from '../../../supabaseClient';
import { selectUserInfo, setAddUserInfo } from '../../store/slices/authSlice';
import SearchInput from '../SearchInput/SearchInput';
import './Header.scss';

const Header = () => {
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
                <img
                    className="header__logo-img"
                    src={logo}
                    alt="LolMusic Logo"
                    width="65"
                    height="65"
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                />
            </Link>

            <SearchInput />
            {userInfo ? (
                <div
                    className="header__user"
                    onClick={handleUserMenu}
                    title={usernameFromEmail}
                >
                    <img
                        className="header__avatar"
                        src={userInfo.avatar || avatar}
                        alt={`${usernameFromEmail || 'User'}'s avatar`}
                        width="49"
                        height="49"
                        loading="eager"
                        decoding="async"
                        fetchpriority="high"
                        onClick={() => setUserMenu(!userMenu)}
                    />
                    <div
                        className={`header__user-menu ${
                            userMenu ? 'header__user-menu-show' : ''
                        }`}
                    >
                        <div className="header__user-menu-top">
                            <button
                                onClick={handleUserMenu}
                                className="header__close-btn"
                                onClick={() => setUserMenu(false)}
                                aria-label="Close user menu"
                            >
                                <IoMdClose aria-hidden="true" />
                            </button>
                            <span className="header__username">
                                {usernameFromEmail}
                            </span>
                        </div>
                        <button
                            className="header__logout-btn"
                            onClick={handleLogOut}
                            aria-label="Log out from account"
                        >
                            log out
                        </button>
                    </div>
                </div>
            ) : (
                <div className="header__auth">
                    <div className="header__auth-links">
                        <Link
                            className="header__auth-link"
                            to="/signup"
                            aria-label="Sign up for new account"
                        >
                            Sign Up
                        </Link>

                        <Link
                            className="header__auth-link header__auth-login"
                            to="/login"
                            aria-label="Log in to existing account"
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
