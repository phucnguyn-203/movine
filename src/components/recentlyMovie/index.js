/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/navigation';

import { getHistoryMovies } from '../../utilities/localstorage';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import MovieItem from '../movieItem';

const RecentlyMovie = () => {

    const [recentlyMovies, setRecentlyMovie] = useState(getHistoryMovies());

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
        <>
            {recentlyMovies.length > 0 ? <>
                <h1 className='movie-list__title'>Recently</h1>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={slidesItem}
                    navigation
                >
                    {recentlyMovies?.slice()?.reverse()?.map(movie => (
                        <SwiperSlide
                            key={movie.id}
                        >
                            <MovieItem
                                movie={movie}
                                mediaType={movie.mediaType}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper></> : null}
        </>
    );
};

export default RecentlyMovie;