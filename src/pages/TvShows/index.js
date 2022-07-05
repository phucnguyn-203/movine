/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import useDocumentTitle from '../../hooks/useDocumentTitle';
import Loading from '../../components/loading';
import MovieItem from '../../components/movieItem';
import Layout from '../../components/layout';
import '../../scss/grid.scss';

const TvShows = () => {
    useDocumentTitle('Tv Shows');

    const [page, setPage] = useState(1);
    const [tvShows, setTvShows] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getTvShows = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ENDPOINT}/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`,
            );
            setTvShows([...tvShows, ...response.data.results]);
            setTotalPages(response.data.total_pages);
            setPage(page + 1);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getTvShows();
    }, []);

    return (
        <Layout>
            {isLoading ? (
                <Loading />
            ) : (
                <InfiniteScroll dataLength={tvShows.length} next={getTvShows} hasMore={page < totalPages}>
                    <div className="grid wide">
                        <div className="row" style={{ marginTop: 80, paddingLeft: 12, paddingRight: 12 }}>
                            {tvShows?.map((tvShow) => (
                                <div key={tvShow?.id} className="col l-2-4 m-4 c-6">
                                    <div style={{ marginBottom: 24 }}>
                                        <MovieItem movie={tvShow} mediaType="tv" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
            )}
        </Layout>
    );
};

export default TvShows;
