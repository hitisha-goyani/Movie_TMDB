import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY

const Search = () => {
  const type = useSelector((state) => state.typeToggle.type); // 'movie' or 'tv'
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const delay = setTimeout(() => {
      fetchResults(query);
    }, 500);

    return () => clearTimeout(delay);
  }, [query, type]);

  const fetchResults = async (searchText) => {
    const url = `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
      searchText
    )}&page=1&include_adult=false`;

    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative  md:w-1/2 mx-auto px-4 z-50">
      {/* Search Input */}
      <div className="flex items-center bg-gray-900 bg-opacity-80 border border-gray-700 rounded-full px-4 py-2 shadow-lg focus-within:ring-2 focus-within:ring-red-500 transition-all duration-300">
        <FaSearch className="text-gray-400 mr-3" />
        <input
          type="text"
          placeholder={`Search ${type === "movie" ? "Movies" : "TV Shows"}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent flex-grow text-white placeholder-gray-500 focus:outline-none"
        />
      </div>

      {/* Search Results */}
      {query && (
        <ul className="absolute left-4 right-4 md:left-0 md:right-0 mt-2 bg-gray-900 border border-gray-800 rounded-lg shadow-xl max-h-80 overflow-y-auto backdrop-blur-sm">
          {loading && (
            <li className="text-white px-4 py-3 text-center animate-pulse">
              Loading...
            </li>
          )}
          {!loading && results.length === 0 && (
            <li className="text-gray-400 px-4 py-3 text-center">No results found.</li>
          )}
          {!loading &&
            results.map((item) => (
              <li key={item.id} className="hover:bg-gray-800 transition duration-150">
                <Link
                  to={`/${type}/${item.id}`}
                  className="flex items-center space-x-4 px-4 py-3 text-white"
                >
                  {item.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                      alt={item.title || item.name}
                      className="w-10 h-14 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-10 h-14 bg-gray-700 rounded-md flex items-center justify-center text-sm text-gray-400">
                      N/A
                    </div>
                  )}
                  <div>
                    <div className="font-semibold">
                      {type === "movie" ? item.title : item.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {item.release_date || item.first_air_date || "N/A"}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
