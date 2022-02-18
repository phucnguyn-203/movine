import React from 'react';

import './movieItem.scss';

const MovieItem = ({ movie }) => {
    return (
        <div className='movie-item'>
            <div className='movie-poster'>
                <img src={`${process.env.REACT_APP_IMAGE_ENDPOINT}${movie?.poster_path}`} alt='poster' />
            </div>
            <p className='movie-title'>{movie?.title || movie?.name}</p>
        </div>
    );
};

export default MovieItem;