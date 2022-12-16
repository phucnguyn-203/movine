/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import InfiniteScroll from 'react-infinite-scroll-component';

import useDocumentTitle from '../../hooks/useDocumentTitle';
import Loading from '../../components/loading';
import MovieItem from '../../components/movieItem';

const TvShows = () => {
    useDocumentTitle('Tv Shows');

    const [page, setPage] = useState(1);
    const [tvShows, setTvShows] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getTvShows = async () => {
        try {
            const response = await axiosClient.get(`/tv/popular`, { params: { page } });
            setTvShows([...tvShows, ...response.data.results]);
            setTotalPages(response.data.total_pages);
            setPage(page + 1);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getTvShows();
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <InfiniteScroll dataLength={tvShows.length} next={getTvShows} hasMore={page < totalPages}>
                    <div className="grid wide">
                        <div className="row page__mt pd-content">
                            {tvShows?.map((tvShow) => (
                                <div key={tvShow?.id} className="col l-2-4 m-4 c-6">
                                    <MovieItem movie={tvShow} mediaType="tv" />
                                </div>
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
            )}
        </>
    );
};

export default TvShows;
