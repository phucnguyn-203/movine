import React from 'react';

import './footer.scss';

const Footer = () => {
    return (
        <footer>
            <p>Nguyen Hoang Phuc</p>
            <div className='footer__social'>
                <a className='footer__social-link' href='https://www.facebook.com/profile.php?id=100037309772290' target="_blank" rel="noopener noreferrer">
                    <ion-icon name="logo-facebook"></ion-icon>
                </a>
                <a className='footer__social-link' href='https://github.com/phucnhdev' target="_blank" rel="noopener noreferrer">
                    <ion-icon name="logo-github"></ion-icon>
                </a>
            </div>
        </footer>
    );
};

export default Footer;