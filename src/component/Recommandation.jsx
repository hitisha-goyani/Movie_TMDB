import React from 'react';
import { Link } from 'react-router';
import { showMovie } from '../rtk_querys/MovieReducer/showMovie';

const Recommandation = () => {
  const { data } = showMovie.useAllMovieQuery({ endpoint: "movie/541671/recommendations" });

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-red-600 pl-4">
       Recommandation
      </h1>

      <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {data?.results.map((ele) => (
          <div
            key={ele.id}
            className="bg-black rounded-lg overflow-hidden shadow-md hover:shadow-red-500/40 transition duration-300 group"
          >
          
            <div className="relative overflow-hidden">
            
              <img
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110 group-hover:blur-sm"
                src={`https://image.tmdb.org/t/p/w500${ele.backdrop_path}`}
                alt={ele.original_title}
              />

           
              <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/70 to-red-900 opacity-0 group-hover:opacity-90 transition-opacity duration-500"></div>

      
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 translate-y-5 group-hover:translate-y-0 transition-all duration-500 text-center">
                <h5 className="text-lg font-bold text-red-500 px-4 mb-2 drop-shadow-lg">
                  {ele.original_title}
                </h5>
          
                <p className="text-sm text-gray-300 mb-4">
                  {ele.release_date || "Unknown"}
                </p>
                <Link
                  to={`/discover/${ele.media_type || "movie"}/${ele.id}`}
                  className="px-4 py-2 text-sm font-medium text-black bg-red-500 rounded hover:bg-red-600 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      </section>
    </>
  );
};

export default Recommandation;
