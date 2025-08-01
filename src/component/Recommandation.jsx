import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Recommandation = ({ title, data = [], type = "movie" }) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-red-600 pl-4">Recommended For You</h2>

         
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.slice(0, 6).map((item, index) => (
          <Link
            to={`/discover/${type}/${item.id}`}
            key={item.id}
            className={`relative group rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.01] ${
              index % 2 === 0 ? "lg:col-span-2" : ""
            }`}
          >
            <img
              src={
                item.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                  : `https://image.tmdb.org/t/p/original${item.poster_path}`
              }
              alt={item.title || item.name}
              className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
              <h3 className="text-white text-2xl font-bold transition-all duration-300 group-hover:translate-y-[-4px]">
                {item.title || item.name}
              </h3>

              <div className="text-sm text-gray-300 flex justify-between items-center mt-1">
                <span>{(item.release_date || item.first_air_date || "").slice(0, 4)}</span>
                <span>⭐ {item.vote_average?.toFixed(1)}</span>
              </div>

              <p className="text-xs mt-2 text-gray-200 line-clamp-2 italic">
                {item.overview}
              </p>

              <div className="mt-4">
                <button className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold px-4 py-1.5 rounded-full transition-all hover:bg-white hover:text-red-600 duration-300 group-hover:translate-y-[-2px]">
                  View Details
                  <FaArrowRight className="text-xs" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Recommandation;
