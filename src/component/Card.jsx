import React from 'react'

const Card = ({ele}) => {
  return (
    <div>
      

<div class="max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`} alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h6 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ele.title}</h6>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{ele.vote_average}</p>
           <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Release:{ele.release_date}</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            view
             
        </a>
    </div>
</div>

    </div>
  )
}

export default Card
