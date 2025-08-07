import React from 'react';
import { Link } from 'react-router';
import { showMovie } from '../rtk_querys/MovieReducer/showMovie';

const Recommandation = () => {
  const { data } = showMovie.useAllMovieQuery({ endpoint: "movie/541671/recommendations" });

  return (
    <>
      <h1 className="font-bold text-red-600 text-center text-3xl mt-6">Recommendations</h1>
      <div className='max-w-7xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4'>
        {
          data?.results.map((ele) => (
            <div key={ele.id} className="bg-black border border-red-600 rounded-lg shadow-lg hover:shadow-red-500/50 transition-shadow duration-300">
              <a href="#">
                <img className="rounded-t-lg w-full h-56 object-cover" src={`https://image.tmdb.org/t/p/w500${ele.backdrop_path}`} alt={ele.original_title} />
              </a>
              <div className="p-4">
                <a href="#">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-white">{ele.original_title}</h5>
                </a>
                <p className="mb-3 text-sm text-gray-400">{ele.release_date}</p>
                <Link
                  to={`/discover/${ele.media_type}/${ele.id}`}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-700 rounded hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-500"
                >
                  Read more
                  <svg className="rtl:rotate-180 w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </Link>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default Recommandation;
