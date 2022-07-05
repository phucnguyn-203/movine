import React from 'react';
import { Link } from 'react-router-dom';
import './movieItem.scss';

const MovieItem = ({ movie, mediaType }) => {
    return (
        <Link to={`/details/${mediaType}/${movie?.id}`} style={{ textDecoration: 'none' }}>
            <div className="movie-item">
                <div className="movie-poster">
                    <img src={`${process.env.REACT_APP_IMAGE_ENDPOINT}${movie?.poster_path}`} alt="poster" />
                </div>
                <p className="movie-title">{movie?.title || movie?.name}</p>
            </div>
        </Link>
    );
};

export default MovieItem;
