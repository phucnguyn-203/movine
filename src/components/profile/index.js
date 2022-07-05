import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { authenticate } from '../../firebase';
import { signOut } from 'firebase/auth';
import './profile.scss';

const Profile = ({ user }) => {
    const { displayName, photoURL } = user;
    const [isDropdown, setIsDropdown] = useState();
    const profile = useRef(null);

    const handleDropdownMenu = () => {
        setIsDropdown(!isDropdown);
    };

    const handleLogout = async () => {
        try {
            await signOut(authenticate);
        } catch (err) {
            console.log(err);
        }
    };

    const handleClickOutSite = (event) => {
        if (profile.current?.contains(event.target)) {
            // click inside
            return;
        }
        //click outside
        setIsDropdown(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutSite);
        return () => document.removeEventListener('click', handleClickOutSite);
    }, []);

    return (
        <div ref={profile} className="profile" onClick={handleDropdownMenu}>
            <div className="profile__avatar">
                <img src={photoURL} alt="avatar" />
            </div>
            <p className="profile__displayName">{displayName}</p>

            {isDropdown ? (
                <div className="profile__menu">
                    <ul className="proflie__menu-list">
                        <li className="profile__menu-list-item">
                            <Link to="/favorites">Favorite</Link>
                        </li>
                        <li onClick={handleLogout} className="profile__menu-list-item">
                            Log Out
                        </li>
                    </ul>
                </div>
            ) : null}
        </div>
    );
};

export default Profile;
