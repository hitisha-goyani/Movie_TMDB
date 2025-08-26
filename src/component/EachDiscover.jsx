import { RiPlayCircleLine } from "@remixicon/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { showMovie } from "../rtk_querys/MovieReducer/showMovie";
import Trending from "./Trending";

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
      <div className="relative  text-white">
        <div className="relative w-full overflow-hidden rounded-b-lg shadow-lg">
          <img
            className="w-full h-[600px] object-cover mt-5 opacity-60 transition-all duration-300 rounded-lg blur-xs blur-none"
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            alt={data.title || data.name}
          />
        </div>

        <div className="max-w-7xl mx-auto  flex flex-col md:flex-row gap-10 -mt-120 z-10 relative">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <img
              className="rounded-lg shadow-lg "
              src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
              alt={data.title || data.name}
            />
          </div>

          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold">
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

            {data.tagline && (
              <p className="italic text-purple-100">{data.tagline}</p>
            )}

            <div>
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="text-gray-100 leading-relaxed">
                {data.overview.length > 170
                  ? `${data.overview.slice(0, 170)}...`
                  : data.overview}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold">
                {Math.round(data.vote_average * 10)}
              </div>
              <span className="text-sm">User Score</span>
            </div>

            <div className="flex gap-4 mt-4">
              {trailer && (
                <button
                  onClick={openModal}
                  className="flex items-center gap-2 bg-white text-purple-800 px-4 py-2 rounded hover:bg-purple-100 font-semibold"
                >
                  <RiPlayCircleLine size={24} />
                  Play Trailer
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {credits?.crew
                ?.filter((c) =>
                  ["Director", "Screenplay", "Writer"].includes(c.job)
                )
                .slice(0, 3)
                .map((crew, index) => (
                  <div key={index}>
                    <h3 className="font-semibold">{crew.name}</h3>
                    <p className="text-sm text-gray-300">{crew.job}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && trailer && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl">
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={closeModal}
            >
              ✕
            </button>
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------cast section start--------------------------------------------------------------------- */}

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



      {/*-------------------------------- company section ----------------------------------*/}

      <div className="px-6 py-4 text-white">
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
    </>
  );
};

export default EachDiscover;
