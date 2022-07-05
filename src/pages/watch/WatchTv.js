/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './watch.scss';
import Episode from '../../components/episode';
import Similar from '../../components/similar';
import Layout from '../../components/layout';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { setHistoryMovie } from '../../utilities/localstorage';

const WatchTv = () => {
    const { season, esp, id } = useParams();

    const [tvDetails, setTvDetails] = useState();
    const [espDetails, setEspDetails] = useState();
    const [episodes, setEpisodes] = useState();

    const videoRef = useRef();

    useDocumentTitle(`Watch | ${tvDetails?.name}`);

    // get details of tv show
    useEffect(() => {
        const getTvDetails = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_ENDPOINT}/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`,
                );
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
                const response = await axios.get(
                    `${process.env.REACT_APP_API_ENDPOINT}/tv/${id}/season/${season}/episode/${esp}?api_key=${process.env.REACT_APP_API_KEY}`,
                );
                setEspDetails(response.data);
                videoRef.current.scrollIntoView();
            } catch (err) {
                console.log(err);
            }
        };
        getEspDetails();
    }, [esp]);

    // side effect to get episodes of season
    useEffect(() => {
        const getEpisodes = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_ENDPOINT}/tv/${id}/season/${season}?api_key=${process.env.REACT_APP_API_KEY}`,
                );
                setEpisodes(response.data.episodes);
            } catch (err) {
                console.log(err);
            }
        };

        getEpisodes();
    }, [season]);

    return (
        <>
            <div className="container">
                <div ref={videoRef} className="video-wrapper">
                    <iframe
                        src={`${process.env.REACT_APP_TV_STREAMING_API_ENDPOINT}?tmdb=${id}&sea=${season}&epi=${esp}`}
                        frameBorder="0"
                        title="Movie Player"
                        allowFullScreen
                        width="100%"
                        height="100%"
                    ></iframe>
                </div>

                <div className="watch-movie__info">
                    <h1 className="watch-movie__title">{tvDetails?.name}</h1>
                    <p style={{ marginTop: 20, marginBottom: 20 }}>Season: {espDetails?.season_number}</p>
                    <p style={{ marginTop: 20, marginBottom: 20 }}>Episode: {espDetails?.episode_number}</p>
                    <p className="watch-movie__overview">Overview: {espDetails?.overview}</p>
                    <p className="watch-movie__release-date">Air Date: {espDetails?.air_date}</p>
                </div>

                <h1 className="episode__title">Episode</h1>
                <Episode tvId={tvDetails?.id} episodes={episodes} />

                <Similar mediaType="tv" id={id} />
            </div>
        </>
    );
};

export default WatchTv;
