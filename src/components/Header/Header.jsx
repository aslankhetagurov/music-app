import { NavLink } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';
import { useState } from 'react';

import './Header.scss';
import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar.jpg';

const Header = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInputValue = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <header className="header">
            <NavLink className="header__logo" to=".">
                <img className="header__logo-img" src={logo} alt="logo" />
            </NavLink>
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
            <div className="header__user">
                <div className="header__user-greetings">
                    <p>Welcom back,Jack! </p>
                </div>
                <div className="header__user-avatar">
                    <img
                        className="header__avatar-img"
                        src={avatar}
                        alt="avatar"
                    />
                </div>
            </div>
        </header>
    );
};
export default Header;
