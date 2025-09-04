import React from "react";
import { Link } from "react-router-dom";
import { showMovie } from "../rtk_querys/MovieReducer/showMovie";

const Trending = ({ type }) => {
  const { data, isLoading, isError } = showMovie.useAllMovieQuery({
    endpoint: `trending/${type}/day`,  // ✅ fixed
  });

  if (isLoading) return <p className="text-white px-4">Loading...</p>;
  if (isError || !data) return <p className="text-white px-4">Failed to load trending {type}.</p>;

  return (
    <section className=" max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-red-600 pl-4 capitalize">
        Trending {type === "tv" ? "TV Shows" : "Movies"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {data?.results?.slice(0, 8).map((item) => (
          <div
            key={item.id}
            className="relative group bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-red-700/30 transition-transform duration-500 transform hover:scale-105"
          >
            {/* Poster */}
            <img
              src={
                item.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                  : "https://via.placeholder.com/500x280?text=No+Image"
              }
              alt={item.title || item.name}
              className="w-full h-56 object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-[1.5px] group-hover:saturate-150"
            />

            {/* Sliding Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />

            {/* Overlay Content */}
            <div className="absolute bottom-0 w-full p-4 flex flex-col items-center justify-end text-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-8 transition-all duration-700 delay-150">
              <h3 className="text-xl font-semibold text-red-400 drop-shadow">
                {item.title || item.name}
              </h3>
              <p className="text-sm text-gray-300 mt-1">
                {item.release_date || item.first_air_date || "Unknown"}
              </p>

              <Link
                to={`/discover/${type}/${item.id}`}  // ✅ fixed
                className="mt-4 inline-block px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg hover:shadow-red-500/60 transition-all duration-300 hover:scale-105"
              >
                🎬 View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trending;
