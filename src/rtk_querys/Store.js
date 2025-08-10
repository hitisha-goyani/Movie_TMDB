import { configureStore } from "@reduxjs/toolkit";
import typeReducer from "../reduxToolkit/reducer/typeSlice";
import searchReducer from "../reduxToolkit/reducer/typeSlice";

import { showMovie } from "./MovieReducer/showMovie";

export const store = configureStore({
  reducer: {
    [showMovie.reducerPath]: showMovie.reducer,
    typeToggle: typeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(showMovie.middleware),
});
