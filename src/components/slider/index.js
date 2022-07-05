import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/navigation';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import MovieItem from '../movieItem';

const Slider = ({ movies, mediaType }) => {
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
        <Swiper modules={[Navigation]} spaceBetween={20} slidesPerView={slidesItem} navigation>
            {movies?.map((movie) => (
                <SwiperSlide key={movie.id}>
                    <MovieItem movie={movie} mediaType={mediaType} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Slider;
