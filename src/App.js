import React from 'react';

import Header from './components/header';
import Router from './router';
import Footer from './components/footer';

const App = () => {
    return (
        <>
            <Header />
            <Router />
            <Footer />
        </>
    );
};

export default App;