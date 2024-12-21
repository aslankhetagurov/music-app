import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUserInfo } from '../../store/slices/authSlice';
import logo from '../../assets/logo.png';
import './RegisterPopup.scss';

const RegisterPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const userInfo = useSelector(selectUserInfo);
    const { pathname } = useLocation();

    useEffect(() => {
        const onPopup =
            pathname !== '/login' &&
            pathname !== '/signup' &&
            pathname !== '/recover';

        const timeoutId =
            !userInfo &&
            onPopup &&
            setTimeout(() => {
                setShowPopup(!showPopup);
                turnOffScroll();
            }, 10000);

        return () => {
            clearTimeout(timeoutId);
        };
        // eslint-disable-next-line
    }, [userInfo]);

    const turnOnScroll = () => document.body.classList.remove('scroll-lock');
    const turnOffScroll = () => document.body.classList.add('scroll-lock');

    const handleClosePopupByBtnClick = () => {
        setShowPopup(!showPopup);
        turnOnScroll();
    };

    const handleClosePopupByBackgroundClick = ({ currentTarget, target }) => {
        if (currentTarget === target) {
            setShowPopup(!showPopup);
            turnOnScroll();
        }
    };

    const renderContent = () => {
        return (
            <article
                className="register-popup"
                onClick={handleClosePopupByBackgroundClick}
            >
                <div className="register-popup__wrapper">
                    <button
                        className="register-popup__close-btn"
                        type="button"
                        onClick={handleClosePopupByBtnClick}
                    >
                        +
                    </button>
                    <img
                        className="register-popup__img"
                        src={logo}
                        alt="logo"
                    />
                    <h2 className="register-popup__title">
                        Sign Up and get a chance to experience the app to the
                        fullest
                    </h2>
                    <Link
                        className="register-popup__signup-link"
                        to="/signup"
                        onClick={handleClosePopupByBtnClick}
                    >
                        Sign Up
                    </Link>
                </div>
            </article>
        );
    };

    return showPopup && renderContent();
};

export default RegisterPopup;
