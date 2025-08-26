import React from "react";
import { showMovie } from "../rtk_querys/MovieReducer/showMovie";
import { FaFilm } from "react-icons/fa";

const MovieGeners = ({ list, setList }) => {
  const { data } = showMovie.useAllMovieQuery({ endpoint: "genre/movie/list" });



  const isSelected = (id) => list.includes(id);

  const handleGeners = (id) =>{

    if(isSelected(id)){
      setList(list.filter((e) => e !== id))
    }

    else{
      setList([...list,id]);
    }
  }

  const clearAll = () => setList([]);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h2 className="n">
        Explore by Genre
      </h2>

      

      <div className="flex flex-wrap gap-4 justify-center">

        {list.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-red-400 hover:text-red-300 underline transition duration-200"
          >
            Clear All
          </button>
        )}
        {data?.genres?.map((ele) => (
          <button
            key={ele.id}
            onClick={() => handleGeners(ele.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm backdrop-blur-md border transition-all duration-300 shadow-lg hover:scale-105 
              ${
                isSelected(ele.id)
                  ? "bg-gradient-to-r from-red-600 to-red-400 text-white border-none"
                  : "bg-white/10 border border-rose-500 text-rose-100 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 hover:text-white"
              }`}
          >
            <FaFilm className="text-xs" />
            {ele.name}  
          </button>
        ))}
      </div>
    </div>
  );
};

export default MovieGeners;
