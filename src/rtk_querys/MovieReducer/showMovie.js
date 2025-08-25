

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "0c71655fa1788be5f1840ee6488c5e1e";

export const showMovie = createApi({
  reducerPath: "showmovie",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (build) => ({
    allMovie: build.query({
      query: ({ endpoint, page = 1, list = "", lang = "" }) =>
        `/${endpoint}?api_key=${API_KEY}&with_original_language=${lang}&page=${page}&with_genres=${list && list.join(",")}`,
    }),
    movieVideo: build.query({
      query: ({ id, type }) => `/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`,
    }),
    getTopRatedMovies: build.query({
      query: (type) => `${type}/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    }),
     getPopular: build.query({
      query: ({ type = "movie", page = 1 }) =>
        `/${type}/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
    }),
 
    

  })
})

export const { useGetTopRatedMoviesQuery,useGetPopularQuery,useGetRecommendationsQuery
} = showMovie;