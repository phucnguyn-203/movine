import React from 'react';

import './home.scss';
import Banner from '../../components/banner';
import MovieList from '../../components/movieList';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import RecentlyMovie from '../../components/recentlyMovie';
import Layout from '../../components/layout';

const Home = () => {
    useDocumentTitle('Movine');

    return (
        <>
            <Banner />
            <div className="movie-list__container">
                <RecentlyMovie />
                <MovieList mediaType="movie" type="trending" />

                <MovieList mediaType="movie" type="popular" />

                <MovieList mediaType="movie" type="top_rated" />

                <MovieList mediaType="tv" type="trending" />
                <MovieList mediaType="tv" type="popular" />
                <MovieList mediaType="tv" type="top_rated" />
            </div>
        </>
    );
};

export default Home;
