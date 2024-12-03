'use client';
import {Autoplay, FreeMode, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import Image from 'next/image';

import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './slideshow.css';
import 'swiper/css';


interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductMobileSlideShow = ({images, title, className}: Props) => {

    return (
        <div className={className}>
            <Swiper
                style={{
                    width: '100vw',
                    height: '500px'
                }}
                pagination
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                modules={[FreeMode, Autoplay, Pagination]}
                className="mySwiper2"
            >
                {
                    images.map((image) => (
                        <SwiperSlide key={image}>
                            <Image
                                src={`/products/${image}`}
                                alt={title}
                                width={500}
                                height={400}
                                className="object-fill"
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};
