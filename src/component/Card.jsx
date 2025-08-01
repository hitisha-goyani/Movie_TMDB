


// const Card = ({ ele, type }) => {
//   const title = ele.title || ele.name;
//   const date = ele.release_date || ele.first_air_date;
//   const rating = ele.vote_average.toFixed(1);

//   return (
//     <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
//       <img
//         src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`}
//         alt={title}
//         className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-300"
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//       {/* Info */}
//       <div className="absolute bottom-0 left-0 w-full p-4 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition duration-300">
//         <h3 className="text-white font-semibold text-lg line-clamp-2">{title}</h3>
//         <div className="flex items-center justify-between text-sm text-gray-300 mt-1">
//           <span>{date?.slice(0, 4)}</span>
//           <span>⭐ {rating}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;


// import React from "react";
// import { Link } from "react-router-dom";


// const Card = ({ ele, type }) => {
//   const title = ele.title || ele.name;
//   const date = ele.release_date || ele.first_air_date;
//   const rating = ele.vote_average.toFixed(1);

//   return (
//     <div className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300">
//       <img
//         src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`}
//         alt={title}
//         className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-300"
//       />

//       {/* Dark Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

//       {/* Info + Button */}
//       <div className="absolute bottom-0 left-0 w-full p-4 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300">
//         <h3 className="text-white font-semibold text-lg line-clamp-2">{title}</h3>
//         <div className="flex items-center justify-between text-sm text-gray-300 mt-1">
//           <span>{date?.slice(0, 4)}</span>
//           <span>⭐ {rating}</span>
//         </div>

//         {/* View Button */}
//         <Link
//           to={`/discover/${type}/${ele.id}`}
//           className="mt-3 inline-block bg-red-600 hover:bg-red-700 text-white font-medium rounded-full px-4 py-1.5 text-sm transition-all duration-300"
//         >
//           🎬 View
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Card;

import React from "react";
import { Link } from "react-router-dom";

const Card = ({ ele, type }) => {
  const title = ele.title || ele.name;
  const date = ele.release_date || ele.first_air_date;
  const rating = ele.vote_average.toFixed(1);

  return (
    
    <div className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300">
      
      <img
        src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`}
        alt={title}
        className="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-300"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
        <div className="flex justify-between text-sm text-gray-300 mb-2">
          <span>{date?.slice(0, 4)}</span>
          <span>⭐ {rating}</span>
        </div>
      </div>

      {/* Centered View Button */}
      <Link
        to={`/discover/${type}/${ele.id}`}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-white/20 hover:scale-105 transition-all duration-300">
          🎬 View
        </div>
      </Link>
    </div>
  );
};

export default Card;


