import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import { showMovie } from "../rtk_querys/MovieReducer/showMovie";

const API_KEY = "0c71655fa1788be5f1840ee6488c5e1e";

const MovieDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = showMovie.useMovieDetailQuery({
    id,
    type: "movie",
  });
  const [trailerUrl, setTrailerUrl] = useState(null);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white text-xl font-semibold">
        Loading movie...
      </div>
    );

  if (error || !data)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-red-500 text-xl font-semibold">
        Error loading movie.
      </div>
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
            `https://www.youtube.com/embed/${trailer.key}?autoplay=1&controls=1`
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
    <div className="min-h-screen bg-black text-white px-4 md:px-8 py-12 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Poster */}
        <div className="flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-red-500 ring-opacity-50 hover:scale-105 transition-transform duration-500">
          <img
            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
            alt={data.title}
            className="w-full lg:w-[350px] object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight drop-shadow-md">
            {data.title}
          </h1>

          {/* Overview */}
          <p className="text-gray-300 leading-relaxed mb-8 text-lg">{data.overview}</p>

          {/* Info Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <InfoCard label="Release Date" value={new Date(data.release_date).toLocaleDateString()} />
            <InfoCard label="Rating" value={`⭐ ${data.vote_average.toFixed(1)}`} />
            <InfoCard label="Runtime" value={`${data.runtime} minutes`} />
          </div>

          {/* Genres */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-red-500 mb-4">Genres</h2>
            <div className="flex flex-wrap gap-3">
              {data.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-400 text-white font-semibold text-sm shadow-md hover:scale-105 transition-transform cursor-default"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          {/* Watch Trailer Button */}
          <button
            onClick={fetchTrailer}
            className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold text-lg py-4 px-10 rounded-full shadow-xl transition-transform duration-300 hover:scale-105 flex items-center gap-3"
            aria-label="Watch Trailer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-5 h-5"
              viewBox="0 0 16 16"
            >
              <path d="M6.79 5.093A.5.5 0 0 1 7.5 5.5v5a.5.5 0 0 1-.79.407L4.5 9.07V6.93l2.29-1.837zM8 3a5 5 0 1 0 0 10A5 5 0 0 0 8 3zM1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8z"/>
            </svg>
            Watch Trailer
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal videoUrl={trailerUrl} closeModal={closeModal} />
    </div>
  );
};

const InfoCard = ({ label, value }) => (
  <div className="bg-[#121212] rounded-xl p-6 shadow-lg border border-red-700 hover:border-red-500 transition-colors cursor-default select-none">
    <p className="text-sm text-red-400 uppercase tracking-widest font-medium mb-2">
      {label}
    </p>
    <p className="text-white font-semibold text-xl">{value}</p>
  </div>
);

export default MovieDetail;
