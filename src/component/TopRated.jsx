import React from "react";
import { Link } from "react-router-dom";
import { useGetTopRatedMoviesQuery } from "../rtk_querys/MovieReducer/showMovie";

const TopRated = ({ type }) => {
  const { data, isLoading, error } = useGetTopRatedMoviesQuery(type);

  if (isLoading)
    return (
      <div className="text-white">
        Loading Top Rated {type === "tv" ? "TV Shows" : "Movies"}...
      </div>
    );
  if (error) return <div className="text-red-500">Error loading {type}!</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-red-600 pl-4">
        Top Rated {type === "tv" ? "TV Shows" : "Movies"}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data?.results?.map((item) => (
          <div
            key={item.id}
            className="relative rounded-xl overflow-hidden shadow-xl group transition-all duration-300 transform hover:scale-105 bg-black/80"
          >
            {/* Poster Image */}
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              className="w-full h-72 object-cover group-hover:brightness-75 transition duration-300"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white text-base font-bold line-clamp-2">
                {item.title || item.name}
              </h3>
              <p className="text-gray-300 text-xs mt-1 line-clamp-2">
                {item.overview?.slice(0, 100)}...
              </p>

              <div className="flex justify-between items-center mt-2">
                <span className="text-yellow-400 text-sm font-semibold">
                  ⭐ {item.vote_average?.toFixed(1)}
                </span>
                <span className="text-xs text-gray-400">
                  {(item.release_date || item.first_air_date || "").slice(0, 4)}
                </span>
              </div>

              {/* View Button */}
              <Link
                to={`/discover/${type}/${item.id}`}
                className="mt-4 w-full bg-white/10 text-white text-sm font-semibold py-2 rounded-full text-center backdrop-blur-sm border border-white/20 hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRated;
