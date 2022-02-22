import React from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import './episode.scss';

const Episode = ({ episodes, tvId }) => {

    const { width } = useWindowDimensions();
    //item is show on slider by width screen
    let slidesItem;
    if (width > 1024) {
        slidesItem = 5;
    } else if (width > 740 && width < 1023) {
        slidesItem = 3;
    } else {
        slidesItem = 2;
    }
    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={slidesItem}
            navigation
        >
            {episodes?.map(episode => (
                <SwiperSlide
                    key={episode?.id}
                >
                    <NavLink
                        className='episode-item'
                        to={`/watch/tv/${tvId}/season/${episode?.season_number}/esp/${episode?.episode_number}`}
                        style={({ isActive }) =>
                            isActive ? { backgroundColor: '#f1c40f' } : undefined
                        }
                    >
                        <div className='episode-poster'>
                            <img src={`${process.env.REACT_APP_IMAGE_ENDPOINT}${episode?.still_path}`} alt='poster' />
                        </div>
                        <p className='episode-number'>Episode: {episode?.episode_number}</p>
                    </NavLink>
                </SwiperSlide>
            ))}
        </Swiper>
    );

};

export default Episode;