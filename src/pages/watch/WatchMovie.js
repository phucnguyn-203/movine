import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';

import './watch.scss';
import Similar from '../../components/similar';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { setHistoryMovie } from '../../utilities/localstorage';

const WatchMovie = () => {
    const { id } = useParams();

    const [movieDetail, setMovieDetail] = useState();

    useDocumentTitle(`Watch | ${movieDetail?.title || movieDetail?.name}`);

    useEffect(() => {
        window.scrollTo(0, 0);
        const getMovieDetails = async () => {
            try {
                const movieDetailData = await axiosClient.get(`/movie/${id}`);
                setMovieDetail(movieDetailData.data);
                setHistoryMovie(movieDetailData.data, 'movie');
                //scroll into view when click on similar movie
            } catch (err) {
                console.log(err);
            }
        };
        getMovieDetails();
    }, [id]);

    return (
        <>
            <div className="container">
                <div className="watch__container">
                    <div className="video-wrapper">
                        <iframe
                            src={`${process.env.REACT_APP_MOVIE_STREAMING_API_ENDPOINT}?id=${id}`}
                            frameBorder="0"
                            title="Movie Player"
                            allowFullScreen
                            width="100%"
                            height="100%"
                        ></iframe>
                    </div>
                </div>
                <div className="watch-movie__info">
                    <h1 className="watch-movie__title">{movieDetail?.title || movieDetail?.name}</h1>
                    <p className="watch-movie__overview">{movieDetail?.overview}</p>
                    <p className="watch-movie__release-date">
                        {movieDetail?.release_date
                            ? `Release date: ${movieDetail?.release_date}`
                            : `Last episode: ${movieDetail?.last_air_date}`}
                    </p>
                </div>

                <Similar mediaType="movie" id={id} />
            </div>
        </>
    );
};

export default WatchMovie;
