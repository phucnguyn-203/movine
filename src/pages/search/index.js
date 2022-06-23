import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import Layout from '../../components/layout';
import './search.scss';

const Search = () => {
    useDocumentTitle("Search");

    const [searchKeyWord, setSearchKeyWord] = useState();

    const navigate = useNavigate();

    const navigateToSearchResult = () => {
        navigate(`/results?q=${searchKeyWord}`);
    }

    return (
        <Layout>
            <div className='search__container'>
                <div className='search_form'>
                    <input
                        className='search__input'
                        placeholder='Search'
                        onChange={(event) => setSearchKeyWord(event.target.value)}
                    />
                    <button
                        className='search__button'
                        onClick={navigateToSearchResult}
                    >
                        Search
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default Search;