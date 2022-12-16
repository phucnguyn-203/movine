/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import InfiniteScroll from 'react-infinite-scroll-component';

import useDocumentTitle from '../../hooks/useDocumentTitle';
import Loading from '../../components/loading';
import MovieItem from '../../components/movieItem';

const Trending = () => {
    useDocumentTitle('Trending');

    const [page, setPage] = useState(1);
    const [trendings, setTrendings] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getTrending = async () => {
        try {
            const response = await axiosClient.get(`/trending/all/day`, { params: { page } });
            setTrendings([...trendings, ...response.data.results]);
            setPage(page + 1);
            setTotalPages(response.data.total_pages);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getTrending();
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <InfiniteScroll dataLength={trendings.length} next={getTrending} hasMore={page < totalPages}>
                    <div className="grid wide">
                        <div className="row page__mt pd-content">
                            {trendings?.map((trending) => (
                                <div key={trending?.id} className="col l-2-4 m-4 c-6">
                                    <MovieItem movie={trending} mediaType={trending?.media_type} />
                                </div>
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
            )}
        </>
    );
};

export default Trending;
