import React from 'react';
import { useGetRecommendationsQuery } from '../rtk_querys/MovieReducer/showMovie';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Recommandation = ({ id, type, title }) => {
  const { data, isLoading, error } = useGetRecommendationsQuery({ id, type });

  if (isLoading) return <p className="text-white text-center">Loading recommendations...</p>;
  if (error) return <p className="text-red-500 text-center">Failed to load recommendations.</p>;

  const items = data?.results?.slice(0, 10);

  return (
    <div className="px-4 py-10">
      <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-red-500 pl-4">
        {title}
      </h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {items?.map((item, index) => (
          <SwiperSlide key={item.id}>
            <div className="relative group transition-transform transform hover:scale-105">
              {/* Number Badge */}
              <div
                className={`absolute top-4 left-4 z-30 text-[60px] font-black tracking-wide ${
                  index === 0
                    ? 'text-yellow-500 drop-shadow-lg'
                    : index === 1
                    ? 'text-gray-300 drop-shadow-md'
                    : index === 2
                    ? 'text-orange-400 drop-shadow-sm'
                    : 'text-white/70'
                }`}
                style={{
                  WebkitTextStroke: '1px black',
                  textShadow: '2px 2px 10px rgba(0,0,0,0.7)',
                }}
              >
                {index + 1}
              </div>

              {/* Poster */}
              <img
                src={`https://image.tmdb.org/t/p/w400${item.poster_path}`}
                alt={item.title || item.name}
                className="w-full h-[450px] object-cover rounded-xl shadow-lg group-hover:brightness-75 transition-all duration-300"
              />

              {/* Hover Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                <h3 className="text-white text-lg font-bold">
                  {item.title || item.name}
                </h3>
                <p className="text-gray-300 text-sm line-clamp-2 mt-1">
                  ⭐ {item.vote_average?.toFixed(1)}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Recommandation;
