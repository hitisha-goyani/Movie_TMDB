import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "23f45d0d0053dccafd488246343642e2";

export const showMovie = createApi({
    reducerPath:"showmovie",
    baseQuery:fetchBaseQuery({baseUrl:"https://api.themoviedb.org/3"}),
    endpoints:(build)=>({
        allMovie:build.query({
      query: ({ endpoint, page = 1,lang="",list="" }) =>
        `/${endpoint}?api_key=${API_KEY}&with_original_language=${lang}&page=${page}&with_genres=${list && list.join(",")}`,
    }),
    movieVideo: build.query({
      query: ({ id, type }) => `/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`,
    }),
    
    })
})