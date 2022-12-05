/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import { Link } from 'react-router-dom';

import './movieList.scss';
import Slider from '../slider';

const MovieList = ({ mediaType, type }) => {
    const [movies, setMovies] = useState();

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await axiosClient.get(
                    type === 'trending' ? `/trending/${mediaType}/day` : `/${mediaType}/${type}`,
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
            <div className="movie-list__header">
                <h1 className="movie-list__title">{`${mediaType.charAt(0).toUpperCase()}${mediaType.slice(
                    1,
                )} ${type}`}</h1>
                <Link to={`${mediaType == 'tv' ? 'tvshows' : 'movies'}`}>View More</Link>
            </div>
            <Slider movies={movies} mediaType={mediaType} />
        </>
    );
};

export default MovieList;
