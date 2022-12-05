import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';

import './banner.scss';

const Banner = () => {
    //state for set banner
    const [banner, setBanner] = useState(null);

    //get banner from api
    useEffect(() => {
        const getBanner = async () => {
            try {
                //random movie for banner
                const randomIndex = Math.floor(Math.random() * (19 - 0 + 1) + 0);
                const response = await axiosClient.get('/trending/all/day');
                setBanner(response.data.results[randomIndex]);
            } catch (err) {
                console.log(err);
            }
        };
        getBanner();
    }, []);

    return (
        <div
            className="banner"
            style={{ backgroundImage: `url(${process.env.REACT_APP_IMAGE_ENDPOINT}${banner?.backdrop_path})` }}
        >
            <div className="banner__content">
                <div className="banner__info">
                    <h1 className="movie__title">{banner?.title || banner?.name}</h1>
                    <p className="movie__overview">{banner?.overview}</p>
                    <div className="movie__action">
                        <Link
                            to={
                                banner?.media_type === 'movie'
                                    ? `/watch/${banner?.media_type}/${banner?.id}`
                                    : `/watch/${banner?.media_type}/${banner?.id}/season/1/esp/1`
                            }
                            className="button"
                        >
                            Watch Now
                        </Link>
                        <Link to={`/details/${banner?.media_type}/${banner?.id}`} className="button">
                            View Info
                        </Link>
                    </div>
                </div>
                <div className="banner__poster">
                    <img src={`${process.env.REACT_APP_IMAGE_ENDPOINT}${banner?.poster_path}`} alt="poster" />
                </div>
            </div>
        </div>
    );
};

export default Banner;
