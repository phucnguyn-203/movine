/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';

import useDocumentTitle from '../../hooks/useDocumentTitle';
import Loading from '../../components/loading';
import MovieItem from '../../components/movieItem';
import Layout from '../../components/layout';

const SearchResult = () => {
    const [searchParams] = useSearchParams();
    const searchKeyWord = searchParams.get('q');
    useDocumentTitle(`Results | ${searchKeyWord}`);

    const [page, setPage] = useState(1);
    const [searchMovie, setSearchMovie] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getSearchMovie = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_ENDPOINT}/search/multi?api_key=${
                    process.env.REACT_APP_API_KEY
                }&query=${searchKeyWord.trim()}&page=${page}`,
            );
            setSearchMovie([...searchMovie, ...response.data.results]);
            setPage(page + 1);
            setTotalPages(response.data.total_pages);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getSearchMovie();
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div style={{ marginTop: 80 }}>
                    {searchMovie.length !== 0 ? (
                        <>
                            <h1 style={{ color: '#FFF', textAlign: 'center' }}>Search Result For {searchKeyWord}</h1>
                            <InfiniteScroll
                                dataLength={searchMovie.length}
                                next={getSearchMovie}
                                hasMore={page < totalPages}
                            >
                                <div className="grid wide">
                                    <div className="row" style={{ marginTop: 80, paddingLeft: 12, paddingRight: 12 }}>
                                        {searchMovie.map((movie) => (
                                            <div key={movie.poster_path} className="col l-2-4 m-4 c-6">
                                                <div style={{ marginBottom: 24 }}>
                                                    <MovieItem movie={movie} mediaType={movie?.media_type} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </InfiniteScroll>{' '}
                        </>
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: `calc(100vh - 7.2px)`,
                            }}
                        >
                            <h1 style={{ color: '#FFF', textAlign: 'center' }}>
                                {' '}
                                No Search Result For {searchKeyWord}
                            </h1>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default SearchResult;
