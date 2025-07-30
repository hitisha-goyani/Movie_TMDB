import React from 'react'
import { Link } from 'react-router';

const Card = ({ele,type}) => {

      const movieName = ele.title || ele.name;
  return (
    <div>
      

<div className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img className="rounded-t-lg" src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`} alt={movieName} />
    </a>
    <div className="p-5">
        <a href="#">
            <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ele.title}</h6>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{ele.vote_average.toFixed(1)}</p>
           <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Release:{ele.release_date || ele.first_air_date}</p>
           <Link
            to={`/discover/${type}/${ele.id}`}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center"
          >
            View
          </Link>
    </div>
</div>

    </div>
  )
}

export default Card
