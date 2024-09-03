import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../media/css/component/menu.carousel.css";
// import required modules
import { Autoplay } from "swiper/modules";

// cards / slides

import CardSubcribePremium from "./card.subcribe.premium";
import CardInviteFriends from "./card.invite.friends";
//
const MenuCarousel = () => {
  return (
    <>
      <Swiper
        spaceBetween={6}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        loop={true}
        modules={[Autoplay]}
        className="menu_carousel anim_sjump"
      >
        <SwiperSlide className="slide">
          <CardSubcribePremium />
        </SwiperSlide>
        <SwiperSlide>
          <CardInviteFriends />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default MenuCarousel;
