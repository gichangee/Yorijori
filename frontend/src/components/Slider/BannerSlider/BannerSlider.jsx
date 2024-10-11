import * as S from "./BannerSlider.styled";
import Banner from "../../Banner/Banner";

import { getBanners } from "../../../constants/banners";

import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const BannerSlider = () => {
    const banners = getBanners();

    return (
        <S.BannerSlider>
            <Swiper
                modules={[Navigation, Pagination, Autoplay, A11y]}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
                loop={true}
            >
                {banners.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <Banner key={index} {...banner} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </S.BannerSlider>
    );
};

export default BannerSlider;
