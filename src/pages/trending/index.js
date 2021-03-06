/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
            const response = await axios.get(
                `${process.env.REACT_APP_API_ENDPOINT}/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`,
            );
            setTrendings([...trendings, ...response.data.results]);
            setPage(page + 1);
            setTotalPages(response.data.total_pages);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getTrending();
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <InfiniteScroll dataLength={trendings.length} next={getTrending} hasMore={page < totalPages}>
                    <div className="grid wide">
                        <div className="row" style={{ marginTop: 80, paddingLeft: 12, paddingRight: 12 }}>
                            {trendings?.map((trending) => (
                                <div key={trending?.id} className="col l-2-4 m-4 c-6">
                                    <div style={{ marginBottom: 24 }}>
                                        <MovieItem movie={trending} mediaType={trending?.media_type} />
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

export default Trending;
