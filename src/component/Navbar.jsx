

import React, { useState } from "react";
import { FaSearch, FaUserCircle, FaBars, FaTimes, FaPlayCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"; 
import { setType } from "../reduxToolkit/reducer/typeSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const type = useSelector((state) => state.type);

  const handleSetType = (value) => {
    dispatch(setType(value));
    setMenuOpen(false);
  };

  return (
    <nav className="bg-black text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
        
            <div className="flex items-center gap-2 text-red-500 text-2xl font-extrabold">
                      <FaPlayCircle />
                      <span>CineFlix</span>
                    </div>

          <div className="hidden md:flex space-x-8 text-sm uppercase font-semibold tracking-wide">
            <a href="#" className="hover:text-red-500 transition">Home</a>

            <a
              href="#"
              onClick={() => handleSetType("movie")}
              className={`transition duration-300 ${
                type === "movie" ? "text-red-500" : "hover:text-red-500"
              }`}
            >
              Movies
            </a>

            <a
              href="#"
              onClick={() => handleSetType("tv")}
              className={`transition duration-300 ${
                type === "tv" ? "text-red-500" : "hover:text-red-500"
              }`}
            >
              TV Shows
            </a>

            <a href="#" className="hover:text-red-500 transition">Trending</a>
          </div>

   
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-800 text-white rounded-full px-4 py-1 pl-10 text-sm focus:outline-none"
              />
              <FaSearch className="absolute left-3 top-2 text-gray-400" />
            </div>
            <FaUserCircle className="text-2xl hover:text-red-500 cursor-pointer" />
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

     
      {menuOpen && (
        <div className="bg-black px-4 py-2 md:hidden space-y-2">
          <a href="#" className="block py-2 border-b border-gray-700 hover:text-red-500">Home</a>

          <a
            href="#"
            onClick={() => handleSetType("movie")}
            className={`block py-2 border-b border-gray-700 ${
              type === "movie" ? "text-red-500" : "hover:text-red-500"
            }`}
          >
            Movies
          </a>

          <a
            href="#"
            onClick={() => handleSetType("tv")}
            className={`block py-2 border-b border-gray-700 ${
              type === "tv" ? "text-red-500" : "hover:text-red-500"
            }`}
          >
            TV Shows
          </a>

          <a href="#" className="block py-2 border-b border-gray-700 hover:text-red-500">Trending</a>

          <div className="mt-2 relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-800 text-white rounded-full px-4 py-1 pl-10 text-sm focus:outline-none"
            />
            <FaSearch className="absolute left-3 top-2 text-gray-400" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
