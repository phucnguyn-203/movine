import React from 'react';

import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => {
    return (
        <div className="App">
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
