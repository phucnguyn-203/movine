/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axiosClient from '../../api/axiosClient';
import Season from '../../components/season';
import Similar from '../../components/similar';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { setHistoryMovie } from '../../utilities/localstorage';

const WatchTv = () => {
    const { season, esp, id } = useParams();

    const [tvDetails, setTvDetails] = useState();
    const [espDetails, setEspDetails] = useState();
    const [currentSeason, setCurrentSeason] = useState(1);

    useDocumentTitle(`Watch | ${tvDetails?.name}`);

    // get details of tv show
    useEffect(() => {
        window.scrollTo(0, 0);
        const getTvDetails = async () => {
            try {
                const response = await axiosClient.get(`/tv/${id}`);
                setTvDetails(response.data);
                setHistoryMovie(response.data, 'tv');
            } catch (err) {
                console.log(err);
            }
        };
        getTvDetails();
    }, []);

    //get details of episode
    useEffect(() => {
        const getEspDetails = async () => {
            try {
                const response = await axiosClient.get(`/tv/${id}/season/${season}/episode/${esp}`);
                setEspDetails(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        getEspDetails();
    }, [esp]);

    return (
        <>
            <div className="container">
                <div className="watch__container">
                    <div className="video-wrapper tv__wrapper ">
                        <iframe
                            src={`${process.env.REACT_APP_TV_STREAMING_API_ENDPOINT}?id=${id}&s=${season}&e=${esp}`}
                            frameBorder="0"
                            title="Movie Player"
                            allowFullScreen
                            width="100%"
                            height="100%"
                        ></iframe>
                    </div>
                    <div className="tv__season ">
                        {tvDetails?.seasons.map((season) => (
                            <Season
                                season={season}
                                key={season.poster_path}
                                currentSeason={currentSeason}
                                setCurrentSeason={setCurrentSeason}
                            />
                        ))}
                    </div>
                </div>

                <div className="watch-movie__info">
                    <h1 className="watch-movie__title">{tvDetails?.name}</h1>
                    <p style={{ marginTop: 20, marginBottom: 20 }}>Season: {espDetails?.season_number}</p>
                    <p style={{ marginTop: 20, marginBottom: 20 }}>Episode: {espDetails?.episode_number}</p>
                    <p className="watch-movie__overview">Overview: {espDetails?.overview}</p>
                    <p className="watch-movie__release-date">Air Date: {espDetails?.air_date}</p>
                </div>

                <Similar mediaType="tv" id={id} />
            </div>
        </>
    );
};

export default WatchTv;
