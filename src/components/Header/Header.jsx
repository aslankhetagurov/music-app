import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logo from '/logo.webp';
import avatar from '../../assets/avatar.png';
import supabase from '../../../supabaseClient';
import { selectUserInfo, setAddUserInfo } from '../../store/slices/authSlice';
import SearchInput from '../SearchInput/SearchInput';
import './Header.scss';

const Header = () => {
    const [userMenu, setUserMenu] = useState(false);
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const userMenuRef = useRef(null);
    const avatarRef = useRef(null);

    useEffect(() => {
        if (!userMenu) return;

        const handleClickOutside = (e) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(e.target) &&
                !avatarRef.current?.contains(e.target)
            ) {
                setUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [userMenu]);

    const handleLogOut = async () => {
        let { error } = await supabase.auth.signOut();
        error && console.log(error);
        !error && dispatch(setAddUserInfo(null));
    };

    const usernameFromEmail = userInfo?.email.split('@')[0];

    return (
        <header className="header">
            <Link
                className="header__logo"
                to="/"
                aria-label="Go to homepage"
                tabIndex={0}
            >
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
                <div className="header__user" title={usernameFromEmail}>
                    <button
                        type="button"
                        className="header__avatar-btn"
                        onClick={() => setUserMenu((prev) => !prev)}
                        aria-label="Open user menu"
                        ref={avatarRef}
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
                        />
                    </button>

                    <div
                        className={`header__user-menu ${
                            userMenu ? 'header__user-menu-show' : ''
                        }`}
                        ref={userMenuRef}
                    >
                        <div className="header__user-menu-top">
                            <button
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
