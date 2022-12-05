/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import InfiniteScroll from 'react-infinite-scroll-component';

import useDocumentTitle from '../../hooks/useDocumentTitle';
import Loading from '../../components/loading';
import MovieItem from '../../components/movieItem';

const Movies = () => {
    useDocumentTitle('Movies');

    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getMovies = async () => {
        try {
            const response = await axiosClient.get(`/movie/popular`, { params: { page } });
            setMovies([...movies, ...response.data.results]);
            setTotalPages(response.data.total_pages);
            setPage(page + 1);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getMovies();
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <InfiniteScroll dataLength={movies.length} next={getMovies} hasMore={page < totalPages}>
                    <div className="grid wide">
                        <div className="row" style={{ marginTop: 80, paddingLeft: 12, paddingRight: 12 }}>
                            {movies?.map((movie) => (
                                <div key={movie?.id} className="col l-2-4 m-4 c-6">
                                    <div style={{ marginBottom: 24 }}>
                                        <MovieItem movie={movie} mediaType="movie" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
            )}
        </>
    );
};

export default Movies;
