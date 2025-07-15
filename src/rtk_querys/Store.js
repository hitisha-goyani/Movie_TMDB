import { configureStore } from "@reduxjs/toolkit";



import { showMovie } from "./MovieReducer/showMovie";

export const store = configureStore({
  reducer: {
    [showMovie.reducerPath]: showMovie.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(showMovie.middleware),
});                     