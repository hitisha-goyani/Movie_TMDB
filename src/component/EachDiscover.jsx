import { RiPlayCircleLine } from "@remixicon/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { showMovie } from "../rtk_querys/MovieReducer/showMovie";
import Trending from "./Trending";
import Recommandation from "./Recommandation";

const EachDiscover = () => {
  const { id, type } = useParams();

  const { data, isLoading, isError } = showMovie.useAllMovieQuery({
    endpoint: `${type}/${id}`,
  });

  const { data: credits } = showMovie.useAllMovieQuery({
    endpoint: `${type}/${id}/credits`,
  });
  const { data: videoData, isLoading: videoLoading } =
    showMovie.useMovieVideoQuery({ id, type });

  const [isModalOpen, setModalOpen] = useState(false);

  if (isLoading || videoLoading)
    return <p className="text-white">Loading movie details...</p>;
  if (isError || !data)
    return <p className="text-white">Error loading movie details.</p>;

  const trailer = videoData?.results?.find(
    (vid) =>
      vid.site === "YouTube" &&
      (vid.type === "Trailer" || vid.type === "Teaser")
  );

  const openModal = () => {
    if (trailer) {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };




  return (
    <>
     <div className="relative text-white">
  {/*  Backdrop with Gradient Overlay */}
  <div className="relative w-full overflow-hidden rounded-b-2xl shadow-xl">
    <img
      className="w-full h-[600px] object-cover mt-5 opacity-70 transition-all duration-500 "
      src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
      alt={data.title || data.name}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
  </div>

  {/* Content */}
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 -mt-150 z-10 relative p-6">
    {/* Poster with Glow */}
    <div className="w-full md:w-1/3 flex-shrink-0">
      <div className="rounded-2xl overflow-hidden shadow-2xl relative group">
        <img
          className="rounded-2xl transition-transform duration-500 group-hover:scale-105"
          src={`https://image.tmdb.org/t/p/w400${data.poster_path}`}
          alt={data.title || data.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition"></div>
      </div>
    </div>

    {/* Details */}
    <div className="flex-1 space-y-6 pt-12">
      <h1 className="text-5xl font-extrabold tracking-wide">
        {data.title || data.name}{" "}
        <span className="text-gray-300 text-2xl">
          ({(data.release_date || data.first_air_date)?.slice(0, 4)})
        </span>
      </h1>

      <p className="text-sm text-gray-300">
        {data.release_date || data.first_air_date} •{" "}
        {data.genres?.map((g) => g.name).join(", ")} •{" "}
        {data.runtime
          ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
          : data.episode_run_time
          ? `${data.episode_run_time[0]} mins/ep`
          : ""}
      </p>

      {/* Tagline */}
      {data.tagline && (
        <p className="italic text-red-300 text-lg animate-pulse">
          ❝ {data.tagline} ❞
        </p>
      )}

      {/* Overview */}
      <div>
        <h2 className="text-2xl font-semibold border-b border-red-500/40 pb-2">
          Overview
        </h2>
        <p className="text-gray-100 leading-relaxed mt-2">
          {data.overview.length > 200
            ? `${data.overview.slice(0, 200)}...`
            : data.overview}
        </p>
      </div>



    
    {/* User Score (Circular) */}
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="gray"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="red"
              strokeWidth="6"
              strokeDasharray={2 * Math.PI * 28}
              strokeDashoffset={
                2 * Math.PI * 28 - (data.vote_average * 10 * 2 * Math.PI * 28) / 100
              }
              fill="transparent"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-bold text-lg">
            {Math.round(data.vote_average * 10)}%
          </span>
        </div>
        <span className="text-sm uppercase tracking-wider">User Score</span>
      </div>

      {/* Trailer Button */}
      {trailer && (
        <div className="mt-6">
          <button
            onClick={openModal}
            className="relative flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-red-500/50 text-white font-semibold shadow-lg hover:scale-105 hover:bg-red-600 hover:text-white transition-all"
          >
            <RiPlayCircleLine size={28} />
            Play Trailer
            <span className="absolute inset-0 rounded-full bg-red-500 opacity-20 animate-ping"></span>
          </button>
        </div>
      )}

   {/* Crew Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {credits?.crew
          ?.filter((c) => ["Director", "Screenplay", "Writer"].includes(c.job))
          .slice(0, 3)
          .map((crew, index) => (
            <div
              key={index}
              className="relative p-5 rounded-xl bg-white/10 backdrop-blur-md shadow-lg group overflow-hidden border border-red-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-white/5 opacity-0 group-hover:opacity-100 transition"></div>
              <h3 className="font-semibold text-lg">{crew.name}</h3>
              <p className="text-sm text-gray-300">{crew.job}</p>
            </div>
          ))}
      </div>
    </div>
  </div>
</div>


{/* Trailer Modal */}
{isModalOpen && trailer && (
  <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
    <div className="relative w-full max-w-5xl">
      <button
        className="absolute -top-10 right-0 text-white text-3xl hover:text-red-400"
        onClick={closeModal}
      >
        ✕
      </button>
      <iframe
        width="100%"
        height="520"
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title="Trailer"
        allowFullScreen
        className="rounded-xl shadow-lg"
      ></iframe>
    </div>
  </div>
)}


      {/* -------------------------------------------------------cast section start--------------------------------------------------------------------- */}
<div className="max-w-7xl mx-auto ">
      <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-red-600 pl-4 capitalize my-12 ms-5">
        Top Billed Cast
      </h2>

<Swiper
  spaceBetween={25}
  slidesPerView="auto"
  grabCursor={true}
  navigation
  className="custom-carousel relative"
>
  {credits.cast.slice(0, 15).map((cast) => (
    <SwiperSlide
      key={cast.id}
      style={{ width: "180px" }}
      className="rounded-3xl bg-black/70 backdrop-blur-md shadow-lg hover:shadow-red-600/40 transition-shadow duration-500 transform hover:-translate-y-3 hover:scale-[1.05] group"
    >
      <div className="rounded-3xl overflow-hidden relative">
        <img
          src={
            cast.profile_path
              ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
              : "https://via.placeholder.com/185x278?text=No+Image"
          }
          alt={cast.name}
          className="w-full h-[260px] object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none"></div>

        <div className="absolute bottom-0 p-4 w-full bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="font-semibold text-white truncate group-hover:text-red-400 transition-colors duration-300">
            {cast.name}
          </h3>
          <p className="text-xs text-gray-300 truncate italic">{cast.character || "—"}</p>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
</div>



      {/*-------------------------------- company section ----------------------------------*/}

      <div className="max-w-7xl mx-auto px-6 py-4 text-white">
  {data.production_companies?.length > 0 && (
    <div className="mt-8 bg-black/60 backdrop-blur-md  rounded-3xl shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-red-600 pl-4 capitalize">
        Production Companies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.production_companies.map((company) => (
          <div
            key={company.id}
            className="bg-gradient-to-br from-zinc-900/70 to-zinc-800/50 backdrop-blur-sm rounded-xl p-5 flex items-center gap-5 shadow-lg hover:shadow-red-700/30 transition-shadow duration-400 group hover:scale-105"
          >
            {company.logo_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                alt={company.name}
                className="h-14 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="h-14 w-14 flex items-center justify-center bg-red-700/80 text-white font-bold rounded-full text-lg shadow-lg">
                {company.name[0]}
              </div>
            )}

            <span className="text-white text-lg font-semibold group-hover:text-red-400 transition-colors duration-300 truncate">
              {company.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )}
</div>



{/* -------------------------------------------------------------trending section --------------------------------------------------------------------------------------- */}
  <Trending type={type}/>
{/* -------------------------------------------------------------recommandation section ---------------------------------------- */}

<Recommandation id={id} type={type} />
    </>
  );
};



export default EachDiscover;
