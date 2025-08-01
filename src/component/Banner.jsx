// // components/Banner.jsx
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import { Autoplay, EffectFade } from "swiper/modules";

// const Banner = ({ data, type }) => {
//   return (
//     <div className="w-full  relative mt-50">
//       <Swiper
//         modules={[Autoplay, EffectFade]}
//         effect="fade"
//         autoplay={{ delay: 4000 }}
//         loop
//       >
//         {data?.results?.slice(0, 5)?.map((item) => (
//           <SwiperSlide key={item.id}>
//             <div
//               className="w-full  bg-cover bg-center flex items-center px-10"
//               style={{
//                 backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
//               }}
//             >
//               <div className="flex flex-col md:flex-row items-center gap-6 bg-black/60 p-4 rounded-lg">
//                 <img
//                   src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
//                   className="rounded-lg shadow-lg w-52"
//                   alt={item.title || item.name}
//                 />
//                 <div className="text-white max-w-xl">
//                   <h2 className="text-3xl font-bold mb-2">
//                     {item.title || item.name}
//                   </h2>
//                   <p className="text-sm opacity-80 line-clamp-4">
//                     {item.overview}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default Banner;



//           import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/pagination";
// import { useNavigate } from "react-router-dom";

// const Banner = ({ slides = [], type }) => {
//   const navigate = useNavigate();

//   const handleClick = (id) => {
//     navigate(`/${type}/${id}`);
//   };

//   return (
//     <div className="relative h-[70vh] w-full overflow-hidden">
//       <Swiper
//         modules={[Autoplay, EffectFade, Pagination]}
//         effect="fade"
//         loop
//         autoplay={{ delay: 4000 }}
//         pagination={{ clickable: true }}
//         className="h-full"
//       >
//         {slides.map((item) => (
//           <SwiperSlide key={item.id}>
//             <div
//               className="w-full h-full bg-cover bg-center relative"
//               style={{
//                 backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
//               }}
//             >
//               <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center px-6 md:px-16">
//                 <div className="max-w-xl">
//                   <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">
//                     {item.title || item.name}
//                   </h2>
//                   <p className="text-gray-300 text-sm md:text-base line-clamp-3 mb-4">
//                     {item.overview}
//                   </p>
//                   <button
//                     onClick={() => handleClick(item.id)}
//                     className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//                   >
//                     View Details
//                   </button>
//                 </div>
//                 <img
//                   src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
//                   alt={item.title || item.name}
//                   className="hidden md:block rounded-lg shadow-lg ml-auto h-[60%]"
//                 />
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default Banner;
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useSelector } from "react-redux";

const Banner = ({ data }) => {
  const type = useSelector((state) => state.type); // "movie" or "tv"

  return (
    <div className="w-full">
      <Swiper
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {data?.results?.slice(0, 6).map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="w-full  mt-20 h-[75vh] bg-cover bg-center flex items-center px-4 md:px-16"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
              }}
            >
              <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between bg-black/60 p-4 rounded-xl">
                <div className="text-white space-y-4 md:w-2/3">
                  <h2 className="text-2xl md:text-4xl font-bold">{item.title || item.name}</h2>
                  <p className="text-sm md:text-base text-gray-300 line-clamp-4">
                    {item.overview}
                  </p>
                  <button className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition">
                    View Details
                  </button>
                </div>

                {/* Poster on side */}
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.title || item.name}
                  className="hidden md:block w-40 h-auto rounded-lg shadow-xl"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
