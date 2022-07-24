/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Slider from '../slider';

const Similar = ({ mediaType, id }) => {
    const [similarMovie, setSimilarMovie] = useState();

    useEffect(() => {
        const getSimilarMovie = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_ENDPOINT}/${mediaType}/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`,
                );
                setSimilarMovie(response.data.results);
            } catch (err) {
                console.log(err);
            }
        };

        getSimilarMovie();
    }, [mediaType, id]);

    return (
        <>
            <h1 className="movie-list__title">Similar movie</h1>
            <Slider movies={similarMovie} mediaType={mediaType} />
        </>
    );
};

export default Similar;
