/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { NavLink, useParams } from 'react-router-dom';
import './season.scss';

const Season = ({ season, currentSeason, setCurrentSeason }) => {
    const { id } = useParams();
    const [esisodes, setEpisodes] = useState([]);

    useEffect(() => {
        const getEpisodes = async () => {
            try {
                const response = await axiosClient.get(`/tv/${id}/season/${season.season_number}`);
                setEpisodes(response.data.episodes);
            } catch (err) {
                console.log(err);
            }
        };

        getEpisodes();
    }, []);

    return (
        <>
            <div
                className="season__item"
                onClick={() => {
                    setCurrentSeason(season.season_number);
                }}
            >
                <div className="season__item-poster">
                    <img src={`${process.env.REACT_APP_IMAGE_ENDPOINT}${season?.poster_path}`} alt={season.name} />
                </div>
                <div className="season__item-info">
                    <p className="season__name">{season?.name}</p>
                    <p className="season__episode-count">Episode: {season?.episode_count}</p>
                </div>
            </div>
            <div className="esp">
                {currentSeason === season.season_number
                    ? esisodes.map(({ season_number, episode_number, still_path, overview }) => (
                          <NavLink
                              to={`/watch/tv/${id}/season/${season_number}/esp/${episode_number}`}
                              className={`esp__item ${(isActive) => (isActive ? 'active' : undefined)}`}
                              key={still_path}
                          >
                              <div className="esp__poster">
                                  <img src={`${process.env.REACT_APP_IMAGE_ENDPOINT}${still_path}`} alt={still_path} />
                              </div>
                              <div className="esp__info">
                                  <p>Episode {episode_number}</p>
                                  <p className="esp__overview">Overview: {overview}</p>
                              </div>
                          </NavLink>
                      ))
                    : null}
            </div>
        </>
    );
};

export default Season;
