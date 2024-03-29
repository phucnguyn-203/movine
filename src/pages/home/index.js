import React, { useEffect } from 'react';

import Banner from '../../components/banner';
import MovieList from '../../components/movieList';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import RecentlyMovie from '../../components/recentlyMovie';

const listData = [
    {
        mediaType: 'movie',
        types: ['trending', 'popular', 'top_rated'],
    },
    {
        mediaType: 'tv',
        types: ['trending', 'popular', 'top_rated'],
    },
];

const Home = () => {
    useDocumentTitle('Movine');
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <Banner />
            <div className="movie-list__container">
                <RecentlyMovie />
                {listData.map(({ mediaType, types }) => {
                    return types.map((type) => {
                        return <MovieList mediaType={mediaType} type={type} key={type} />;
                    });
                })}
            </div>
        </>
    );
};

export default Home;
