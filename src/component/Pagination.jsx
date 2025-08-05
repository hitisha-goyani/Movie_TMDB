import React from "react";
import { showMovie } from "../rtk_querys/MovieReducer/showMovie";

const Pagination = ({ page, setPage }) => {
  const { data } = showMovie.useAllMovieQuery({
    endpoint: "discover/movie",
    page: 1,
  });

  return (
    <div className="my-10">
      <div className="flex max-w-xs mx-auto">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          className="flex items-center justify-center px-4 h-10 me-3 text-sm font-medium text-white bg-red-600 border border-red-700 rounded-lg hover:bg-red-700 transition"
        >
          <svg
            className="w-4 h-4 me-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Previous
        </button>

        <span className="flex items-center justify-center px-4 h-10 text-sm font-semibold text-red-600 bg-white border border-red-600 rounded-lg">
          {page}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          className="flex items-center justify-center px-4 h-10 ms-3 text-sm font-medium text-white bg-red-600 border border-red-700 rounded-lg hover:bg-red-700 transition"
        >
          Next
          <svg
            className="w-4 h-4 ms-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
