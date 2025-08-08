import React from "react";
import { Link } from "react-router-dom";

const Card = ({ ele, type }) => {
  const title = ele.title || ele.name;
  const date = ele.release_date || ele.first_air_date;
  const rating = ele.vote_average.toFixed(1);

  return (
    <div className="relative group overflow-hidden rounded-xl bg-black shadow-lg hover:shadow-[0_0_25px_rgba(255,0,0,0.6)] transition-all duration-500 transform hover:-translate-y-1 hover:rotate-1">
      
      {/* Poster Image */}
      <img
        src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`}
        alt={title}
        className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-all duration-700"
      />

      {/* Sliding Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out backdrop-blur-sm flex flex-col justify-between p-4">
        
        {/* Centered View Button */}
        <div className="flex justify-center items-center flex-1 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
          <Link
            to={`/discover/${ele.media_type || type}/${ele.id}`}
            className="bg-red-600/90 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg shadow-red-600 hover:shadow-red-500 hover:scale-110 transition-all duration-300 animate-pulse"
          >
            View Details
          </Link>
        </div>

        {/* Bottom Details */}
        <div>
          <h3 className="text-white font-bold text-lg mb-1 drop-shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300">
            {title}
          </h3>
          <div className="flex justify-between text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-400">
            <span>{date?.slice(0, 4)}</span>
            <span className="text-red-400">⭐ {rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
