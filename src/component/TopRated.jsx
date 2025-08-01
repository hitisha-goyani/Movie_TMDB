import React from 'react';

import { Link } from 'react-router-dom';
import { useGetTopRatedMoviesQuery } from '../rtk_querys/MovieReducer/showMovie';

const TopRated = ({ type}) => {
  const { data, isLoading, error } = useGetTopRatedMoviesQuery(type);

  if (isLoading) return <div className="text-white">Loading Top Rated {type === 'tv' ? 'TV Shows' : 'Movies'}...</div>;
  if (error) return <div className="text-red-500">Error loading {type}!</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-red-600 pl-4">
        Top Rated {type === "tv" ? "TV Shows" : "Movies"}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data?.results?.map((item) => (
          <Link
            to={`/discover/${type}/${item.id}`}
            key={item.id}
            className="bg-gray-900 hover:bg-red-600 transition duration-300 rounded-lg overflow-hidden shadow-lg group"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              className="w-full h-72 object-cover group-hover:opacity-80"
            />
            <div className="p-3 text-white">
              <h3 className="text-sm font-semibold line-clamp-1">
                {item.title || item.name}
              </h3>
              <div className="text-xs text-gray-400 flex justify-between mt-1">
                <span>{(item.release_date || item.first_air_date || '').slice(0, 4)}</span>
                <span>⭐ {item.vote_average?.toFixed(1)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopRated;
