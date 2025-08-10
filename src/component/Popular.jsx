import React from "react";
import { useGetPopularQuery } from "../rtk_querys/MovieReducer/showMovie";


const Popular = () => {
  const { data: popularMovies } = useGetPopularQuery({ type: "movie" });
  const { data: popularTv } = useGetPopularQuery({ type: "tv" });

  return (
    <div>
      <h2 className="text-white text-2xl font-bold mb-4">Popular Movies</h2>
      <ul>
        {popularMovies?.results?.map((m) => (
          <li key={m.id} className="text-white">{m.title}</li>
        ))}
      </ul>

      <h2 className="text-white text-2xl font-bold mt-6 mb-4">Popular TV Shows</h2>
      <ul>
        {popularTv?.results?.map((tv) => (
          <li key={tv.id} className="text-white">{tv.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Popular;
