import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home';
import Trending from '../pages/trending';
import Movies from '../pages/movies';
import TvShows from '../pages/TvShows';
import Details from '../pages/details';
import WatchMovie from '../pages/watch/WatchMovie';
import WatchTv from '../pages/watch/WatchTv';


const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/trending' element={<Trending />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/tvshows' element={<TvShows />} />
            <Route path='/details/:mediaType/:id' element={<Details />} />
            <Route path='/watch/movie/:id' element={<WatchMovie />} />
            <Route path='/watch/tv/:id/season/:season/esp/:esp' element={<WatchTv />} />
        </Routes>
    );
};

export default Router;