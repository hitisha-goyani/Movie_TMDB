import { RiPlayCircleLine } from "@remixicon/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { showMovie } from "../rtk_querys/MovieReducer/showMovie";

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

      <h2 className="text-3xl font-bold text-white my-12 border-l-4  border-red-600 pl-4">
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
            className="rounded-2xl bg-black/50 backdrop-blur-lg border border-red-800 hover:border-red-500 
                 shadow-lg hover:shadow-red-500/50 transition-all duration-500 hover:-translate-y-3"
          >
            <div className="rounded-2xl overflow-hidden relative group">
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                    : "https://via.placeholder.com/185x278?text=No+Image"
                }
                alt={cast.name}
                className="w-full h-[260px] object-cover transform group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

              <div className="absolute bottom-0 p-3 w-full">
                <h3 className="font-bold text-sm text-white truncate group-hover:text-red-400 transition-colors duration-300">
                  {cast.name}
                </h3>
                <p className="text-xs text-gray-300 truncate italic">
                  {cast.character || "—"}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>


      {/*-------------------------------- company section ----------------------------------*/}

       <div className="px-6 py-4 text-white">
  {data.production_companies?.length > 0 && (
    <div className="mt-3 bg-black/60 p-5 rounded-2xl border border-red-600 shadow-lg">
      <h2 className="text-3xl font-bold text-white my-12 border-l-4  border-red-600 pl-4">
        Production Companies
      </h2>

      <div className="flex flex-wrap gap-4">
        {data.production_companies.map((company) => (
          <div
            key={company.id}
            className="flex items-center gap-3 bg-black/80 rounded-lg px-4 py-2 border border-red-700 hover:bg-red-700/20 transition"
          >
            {company.logo_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                alt={company.name}
                className="h-10 object-contain"
              />
            ) : (
              <span className="px-3 py-1 bg-red-800 text-white text-sm rounded">
                {company.name}
              </span>
            )}
            {company.logo_path && (
              <span className="text-sm text-gray-300">{company.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )}
</div>

    </>
  );
};

export default EachDiscover;
