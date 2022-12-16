import React, { useEffect, useState } from 'react';

import MovieItem from '../../components/movieItem';
import axiosClient from '../../api/axiosClient';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useDebounce from '../../hooks/useDebounce';
import './search.scss';

const Search = () => {
    useDocumentTitle('Search');

    const [isSearching, setIsSearching] = useState(false);
    const [searchKeyWord, setSearchKeyWord] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isNoResult, setIsNoResult] = useState(false);
    const debouncedSearchValue = useDebounce(searchKeyWord, 500);

    const getSearchMovie = async () => {
        try {
            const response = await axiosClient.get(`search/multi`, {
                params: { query: debouncedSearchValue.trim() },
            });
            setSearchResult(response.data.results);
            if (response.data.results.length === 0) {
                setIsNoResult(true);
            }
            setIsSearching(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (debouncedSearchValue) {
            setIsSearching(true);
            setIsNoResult(false);
            getSearchMovie();
        } else {
            setIsSearching(false);
            setIsNoResult(false);
            setSearchResult([]);
        }
    }, [debouncedSearchValue]);

    return (
        <>
            <div className="search__container">
                <div className="search_form">
                    <input
                        className="search__input"
                        placeholder="Search..."
                        onChange={(e) => setSearchKeyWord(e.target.value)}
                    />
                </div>
                <div className="search__result-container">
                    {isSearching && <h2 className="searching">Searching...</h2>}
                    <div className="grid wide">
                        <div className="row pd-content">
                            {searchResult.map((movie) => (
                                <div key={movie.id} className="col l-2-4 m-4 c-6">
                                    <MovieItem movie={movie} mediaType={movie?.media_type} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {isNoResult && <h2 className="no-result">No Search Result For {searchKeyWord}</h2>}
                </div>
            </div>
        </>
    );
};

export default Search;
