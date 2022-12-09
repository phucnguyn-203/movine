/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import useDocumentTitle from '../../hooks/useDocumentTitle';
import Loading from '../../components/loading';
import CastList from '../../components/castList';
import Similar from '../../components/similar';
import { addDocument, getDocumentsByCondition } from '../../firebase';
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './details.scss';

const Details = () => {
    const { mediaType, id } = useParams();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.userInfo);
    //state to store details movie
    const [details, setDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const bannerRef = useRef();
    useDocumentTitle(`${details?.title || details?.name}`);

    useEffect(() => {
        const getDetails = async () => {
            try {
                const detailsMovie = await axios.get(
                    `${process.env.REACT_APP_API_ENDPOINT}/${mediaType}/${id}?api_key=${process.env.REACT_APP_API_KEY}`,
                );
                setDetails(detailsMovie.data);
                setIsLoading(false);
                //scroll into view when click on similar movie
                bannerRef.current.scrollIntoView();
            } catch (err) {
                console.log(err);
            }
        };
        getDetails();
    }, [mediaType, id]);

    const handleAddFavoriteList = async () => {
        if (currentUser) {
            try {
                const favoriteMovies = await getDocumentsByCondition('favorite_movies', {
                    field: 'userId',
                    operator: '==',
                    expressions: currentUser.uid,
                });
                const isExistMovie = favoriteMovies.find((movie) => movie.movieDetails.id === details.id);
                if (isExistMovie) {
                    toast.error('Movie already existed', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark',
                    });
                    return;
                }
                await addDocument('favorite_movies', {
                    userId: currentUser.uid,
                    movieDetails: {
                        ...details,
                    },
                });
                toast.success('Add new movie success', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            } catch (err) {
                console.log(err);
            }
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div
                        ref={bannerRef}
                        className="movie__background"
                        style={{
                            backgroundImage: `url(${process.env.REACT_APP_IMAGE_ENDPOINT}${details?.backdrop_path})`,
                        }}
                    >
                        <div className="movie__content">
                            <div className="movie__poster">
                                <img
                                    src={`${process.env.REACT_APP_IMAGE_ENDPOINT}${details?.poster_path}`}
                                    alt="poster"
                                />
                            </div>

                            <div className="movie__info">
                                <h1 className="movie__title">{details?.title || details?.name}</h1>
                                <p className="movie__overview">{details?.overview}</p>
                                <p className="movie__release-date">
                                    {details?.release_date
                                        ? `Release date: ${details?.release_date}`
                                        : `Last episode: ${details?.last_air_date}`}
                                </p>

                                <div className="movie__genres">
                                    {details?.genres.map((genre) => (
                                        <div key={genre.id} className="movie__genres-item">
                                            <p>{genre.name}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="movie__info-action">
                                    <Link
                                        to={
                                            mediaType === 'movie'
                                                ? `/watch/${mediaType}/${id}`
                                                : `/watch/${mediaType}/${id}/season/1/esp/1`
                                        }
                                        className="button"
                                    >
                                        Watch Now
                                    </Link>
                                    <button className="button" onClick={handleAddFavoriteList}>
                                        Add to favorites
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CastList mediaType={mediaType} id={id} />

                    <div className="movie-list__container">
                        <Similar mediaType={mediaType} id={id} />
                    </div>
                </>
            )}
        </>
    );
};

export default Details;
