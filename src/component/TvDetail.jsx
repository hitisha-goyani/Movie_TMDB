import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import { showMovie } from "../rtk_querys/MovieReducer/showMovie";

const API_KEY = "0c71655fa1788be5f1840ee6488c5e1e";

const TvDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = showMovie.useMovieDetailQuery({
    id,
    type: "tv",
  });
  const [trailerUrl, setTrailerUrl] = useState(null);

  if (isLoading)
    return (
      <p className="text-white text-center mt-20 text-xl">Loading movie...</p>
    );
  if (error || !data)
    return (
      <p className="text-red-500 text-center mt-20 text-xl">
        Error loading movie.
      </p>
    );

  const fetchTrailer = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const videos = await res.json();

      if (videos.results && videos.results.length > 0) {
        const trailer = videos.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailer) {
          setTrailerUrl(
            `https://www.youtube.com/embed/${trailer.key}?autoplay=1`
          );
          return;
        }
      }
      alert("Trailer not found.");
    } catch (err) {
      alert("Failed to fetch trailer.");
      console.error(err);
    }
  };

  const closeModal = () => setTrailerUrl(null);

  return (
    <div
      className="relative min-h-screen w-full text-white"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-start gap-12">
        {/* Poster */}
        <div className="w-full md:w-1/3 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300">
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-between w-full md:w-2/3">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              {data.name}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-6 max-w-3xl leading-relaxed">
              {data.overview}
            </p>

            <div className="flex flex-wrap gap-6 mb-8  !text-black p-4 rounded">
              <DetailItem
                title="Release"
                value={new Date(data.first_air_date).toLocaleDateString()}
              />
              <DetailItem
                title="Rating"
                value={`⭐ ${data.vote_average.toFixed(1)}`}
              />
              <DetailItem title="Runtime" value={`${data.episode_run_time} min`} />
              <DetailItem title="Status" value={data.status} />
            </div>

            {/* Genres */}
            <div className="mb-10">
              <h3 className="text-2xl font-semibold mb-3">Genres</h3>
              <div className="flex flex-wrap gap-3">
                {data.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-white text-black px-4 py-1 rounded-full font-semibold text-sm shadow-md"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={fetchTrailer}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold rounded-full shadow-xl transition duration-300"
            >
              ▶ Watch Now
            </button>
            <Modal videoUrl={trailerUrl} closeModal={closeModal} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ title, value }) => (
  <div className="bg-white bg-opacity-10 rounded-lg px-5 py-3 shadow-sm text-center w-32">
    <div className="text-sm text-gray-300">{title}</div>
    <div className="text-lg font-bold">{value}</div>
  </div>
);

export default TvDetail;