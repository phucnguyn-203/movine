import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useWindowDimensions from '../../../../hooks/useWindowDimensions';
import navigation from '../../../../utilities/nav';
import Profile from '../../../profile';
import './header.scss';

const Header = () => {
    const currentUser = useSelector((state) => state.user.userInfo);
    const { width } = useWindowDimensions();
    const [isOpen, setIsOpen] = useState(false);
    const [isToggleHeader, setIsToggleHeader] = useState(false);

    useEffect(() => {
        const toggleHeader = () => {
            if (window.scrollY > 25) {
                setIsToggleHeader(true);
            } else {
                setIsToggleHeader(false);
            }
        };
        window.addEventListener('scroll', toggleHeader);
        if (width <= 739) {
            window.removeEventListener('scroll', toggleHeader);
        }
        //clean up
        return () => window.removeEventListener('scroll', toggleHeader);
    }, [width]);

    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className={`header ${isToggleHeader ? 'header__toggle' : ''}`}>
            <div className="header__container">
                <div className={`overplay ${isOpen ? 'active' : ''}`} onClick={handleToggleMenu}></div>
                {/*Mobile menu*/}
                <div className="header__nav-mobile-icon" onClick={handleToggleMenu}>
                    <ion-icon name="menu-outline"></ion-icon>
                </div>

                <nav className={`header__nav-mobile ${isOpen ? 'active' : ''}`}>
                    <ul className="header__nav-list-mobile">
                        {navigation.map(({ label, path }) => (
                            <li className="header__nav-list-item-mobile" key={path}>
                                <NavLink
                                    to={path}
                                    className={`header__nav-item-link-mobile ${(isActive) =>
                                        isActive ? 'active' : undefined}`}
                                    onClick={handleToggleMenu}
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/********************************************/}
                <div className="header__left-section">
                    <div className="header__logo">
                        <Link to="/" className="header__logo-link">
                            MOV<span className="header__logo-highlight">INE</span>
                        </Link>
                    </div>
                    <nav className="header__nav">
                        <ul className="header__nav-list">
                            {navigation.map(({ label, path }) => (
                                <li className="header__nav-list-item" key={path}>
                                    <NavLink
                                        to={path}
                                        className={`header__nav-item-link ${(isActive) =>
                                            isActive ? 'active' : undefined}`}
                                    >
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="header__right-section">
                    <div className="header__search">
                        <Link to="/search" style={{ display: 'block' }}>
                            <div className="header__search-icon">
                                <ion-icon name="search"></ion-icon>
                            </div>
                        </Link>
                    </div>
                    {currentUser ? (
                        <Profile user={currentUser} />
                    ) : (
                        <Link className="button" to="/login">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
