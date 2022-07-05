/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './movieList.scss';
import Slider from '../slider';

const MovieList = ({ mediaType, type }) => {
    const [movies, setMovies] = useState();

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await axios.get(
                    type === 'trending'
                        ? `${process.env.REACT_APP_API_ENDPOINT}/trending/${mediaType}/day?api_key=${process.env.REACT_APP_API_KEY}`
                        : `${process.env.REACT_APP_API_ENDPOINT}/${mediaType}/${type}?api_key=${process.env.REACT_APP_API_KEY}`,
                );
                setMovies(response.data.results);
            } catch (err) {
                console.log(err);
            }
        };
        getMovies();
    }, []);

    return (
        <>
            <h1 className="movie-list__title">{`${mediaType.charAt(0).toUpperCase()}${mediaType.slice(1)} ${type}`}</h1>
            <Slider movies={movies} mediaType={mediaType} />
        </>
    );
};

export default MovieList;
