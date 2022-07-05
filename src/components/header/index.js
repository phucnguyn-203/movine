import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Profile from '../profile';
import './header.scss';

const Header = () => {
    const currentUser = useSelector((state) => state.user.userInfo);

    useEffect(() => {
        const menuMobile = document.querySelector('.header__nav-mobile-icon');
        const overplay = document.querySelector('.overplay');
        const mobileMenu = document.querySelector('.header__nav-mobile');

        const showMobileMenu = () => {
            overplay.classList.add('active');
            mobileMenu.classList.add('active');
        };

        const hideMobileMenu = () => {
            mobileMenu.classList.remove('active');
            overplay.classList.remove('active');
        };

        overplay.addEventListener('click', hideMobileMenu);
        menuMobile.addEventListener('click', showMobileMenu);

        //clean up
        return () => {
            overplay.removeEventListener('click', hideMobileMenu);
            menuMobile.removeEventListener('click', showMobileMenu);
        };
    });

    useEffect(() => {
        const header = document.querySelector('.header');
        const toggleHeader = () => {
            if (window.scrollY > 25) {
                header.classList.add('header__toggle');
            } else {
                header.classList.remove('header__toggle');
            }
        };
        window.addEventListener('scroll', toggleHeader);

        //clean up
        return () => window.removeEventListener('scroll', toggleHeader);
    }, []);

    return (
        <header className="header">
            <div className="overplay"></div>
            {/*Mobile menu*/}
            <div className="header__nav-mobile-icon">
                <ion-icon name="menu-outline"></ion-icon>
            </div>

            <nav className="header__nav-mobile">
                <ul className="header__nav-list-mobile">
                    <li className="header__nav-list-item-mobile">
                        <NavLink
                            to="/"
                            className={`header__nav-item-link-mobile ${(isActive) =>
                                isActive ? 'active' : undefined}`}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="header__nav-list-item-mobile">
                        <NavLink
                            to="/trending"
                            className={`header__nav-item-link-mobile ${(isActive) =>
                                isActive ? 'active' : undefined}`}
                        >
                            Trending
                        </NavLink>
                    </li>
                    <li className="header__nav-list-item-mobile">
                        <NavLink
                            to="/movies"
                            className={`header__nav-item-link-mobile ${(isActive) =>
                                isActive ? 'active' : undefined}`}
                        >
                            Movies
                        </NavLink>
                    </li>
                    <li className="header__nav-list-item-mobile">
                        <NavLink
                            to="/tvshows"
                            className={`header__nav-item-link-mobile ${(isActive) =>
                                isActive ? 'active' : undefined}`}
                        >
                            TV Shows
                        </NavLink>
                    </li>
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
                        <li className="header__nav-list-item">
                            <NavLink
                                to="/"
                                className={`header__nav-item-link ${(isActive) => (isActive ? 'active' : undefined)}`}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="header__nav-list-item">
                            <NavLink
                                to="/trending"
                                className={`header__nav-item-link ${(isActive) => (isActive ? 'active' : undefined)}`}
                            >
                                Trending
                            </NavLink>
                        </li>
                        <li className="header__nav-list-item">
                            <NavLink
                                to="/movies"
                                className={`header__nav-item-link ${(isActive) => (isActive ? 'active' : undefined)}`}
                            >
                                Movies
                            </NavLink>
                        </li>
                        <li className="header__nav-list-item">
                            <NavLink
                                to="/tvshows"
                                className={`header__nav-item-link ${(isActive) => (isActive ? 'active' : undefined)}`}
                            >
                                TV Shows
                            </NavLink>
                        </li>
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
        </header>
    );
};

export default Header;
