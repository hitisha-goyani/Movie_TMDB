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
      <div className="flex justify-center items-center h-screen bg-[#0a0a0a] text-white text-xl font-semibold">
        Loading movie...
      </div>
    );

  if (error || !data)
    return (
      <div className="flex justify-center items-center h-screen bg-[#0a0a0a] text-red-500 text-xl font-semibold">
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
    <div className="min-h-screen bg-[#0a0a0a] text-white px-5 py-12 max-w-4xl mx-auto">
      {/* Poster */}
      <div className="overflow-hidden rounded-3xl shadow-2xl mb-10 ring-2 ring-blue-500 ring-opacity-50 transform hover:scale-105 transition duration-500 cursor-pointer select-none">
        <img
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          alt={data.title}
          className="w-full object-cover"
        />
      </div>

      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-6 tracking-tight drop-shadow-md">
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
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">Genres</h2>
        <div className="flex flex-wrap gap-3">
          {data.genres.map((genre) => (
            <span
              key={genre.id}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold text-sm shadow-md hover:scale-105 transition-transform cursor-default"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>

      {/* Watch Trailer Button */}
      <button
        onClick={fetchTrailer}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 px-10 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105"
        aria-label="Watch Trailer"
      >
        ▶ Watch Trailer
      </button>

      <Modal videoUrl={trailerUrl} closeModal={closeModal} />
    </div>
  );
};

const InfoCard = ({ label, value }) => (
  <div className="bg-[#121212] rounded-xl p-6 shadow-lg border border-blue-700 hover:border-blue-500 transition-colors cursor-default select-none">
    <p className="text-sm text-blue-400 uppercase tracking-widest font-medium mb-2">
      {label}
    </p>
    <p className="text-white font-semibold text-xl">{value}</p>
  </div>
);

export default MovieDetail;
