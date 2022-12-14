import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './castList.scss';
import '../../scss/grid.scss';
import Cast from '../cast';

const CastList = ({ mediaType, id }) => {
    //state to store cast of movie
    const [casts, setCasts] = useState();
    //side effect
    useEffect(() => {
        const getCasts = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_ENDPOINT}/${mediaType}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`,
                );
                setCasts(response?.data?.cast.slice(0, 10));
            } catch (err) {
                console.log(err);
            }
        };

        getCasts();
    }, [mediaType, id]);

    return (
        <div className="grid wide">
            <h1 className="cast__title">Cast</h1>
            <div style={{ paddingLeft: 8, paddingRight: 8, rowGap: 24 }} className="row">
                {casts?.map((cast) => (
                    <Cast key={cast?.id} cast={cast} />
                ))}
            </div>
        </div>
    );
};

export default CastList;
