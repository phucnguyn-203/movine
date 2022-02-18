import React from 'react';

import './home.scss';
import Banner from '../../components/banner';
import MovieList from '../../components/movieList';

const Home = () => {

    return (
        <>
            <Banner />
            <div className='movies-list__container'>
                <MovieList
                    mediaType='movie'
                    type='trending'
                />

                <MovieList
                    mediaType='movie'
                    type='popular'
                />

                <MovieList
                    mediaType='movie'
                    type='top_rated'
                />

                <MovieList
                    mediaType='tv'
                    type='trending'
                />
                <MovieList
                    mediaType='tv'
                    type='popular'
                />
                <MovieList
                    mediaType='tv'
                    type='top_rated'
                />
            </div>
        </>
    );

};

export default Home;