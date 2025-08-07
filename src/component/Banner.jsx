import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import { RiPlayCircleLine } from "@remixicon/react";
import { useNavigate } from "react-router-dom";

const Banner = ({ data }) => {
  const type = useSelector((state) => state.typeToggle.type);
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <Swiper
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        loop
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {data?.results?.slice(0, 6).map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="relative w-full h-[80vh] bg-cover bg-center animate-fade-in"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(15,15,15,0.95), rgba(15,15,15,0.3)), url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 bg-black/30 md:bg-transparent" />

              <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col md:flex-row items-center md:items-center justify-between px-4 md:px-16 py-10 md:py-0 gap-8">
                <div className="text-white space-y-4 flex-1 bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl animate-fade-in-up border border-white/20">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg leading-tight hover:text-red-400 transition-all duration-300">
                    {item.title || item.name}
                  </h2>

                  <p className="text-sm md:text-base text-gray-200 line-clamp-4 tracking-wide leading-relaxed">
                    {item.overview}
                  </p>

             <button
  onClick={() => navigate(`/discover/${type}/${item.id}`)}
  className="group flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white px-6 py-2 rounded-md transition duration-300 shadow-md hover:scale-105 animate-fade-in-up delay-200"
>
  <RiPlayCircleLine className="w-6 h-6 group-hover:scale-110 transition" />
  <span className="font-semibold tracking-wide">
    View Details
  </span>
</button>
                </div>

                <div className="relative hidden md:block shrink-0 animate-fade-in-right">
                  <div className="absolute -inset-2 bg-red-500 blur-xl opacity-20 rounded-xl" />
                  <img
                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                    alt={item.title || item.name}
                    className="w-44 h-auto rounded-xl shadow-2xl z-10 relative hover:scale-105 transition duration-300"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
