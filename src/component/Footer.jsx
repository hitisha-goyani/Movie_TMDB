import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  // footer start 
  return (
    <footer className="bg-gradient-to-t from-black via-red-900 to-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 text-red-500 text-2xl font-extrabold">
            <FaPlayCircle />
            <span>CineFlix</span>
          </div>
          <p className="text-sm text-gray-400 mt-3 leading-relaxed">
            Stream your favorite movies and TV shows powered by TMDB. Get ratings, reviews, and more.
          </p>
        </div>

    
        <div>
          <h4 className="text-lg font-semibold mb-4 text-red-400">Navigation</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/" className="hover:text-red-500 transition duration-300">Home</Link>
            </li>
            <li>
              <Link to="/discover" className="hover:text-red-500 transition duration-300">Discover</Link>
            </li>
            <li>
              <Link to="/top-rated" className="hover:text-red-500 transition duration-300">Top Rated</Link>
            </li>
            <li>
              <Link to="/upcoming" className="hover:text-red-500 transition duration-300">Upcoming</Link>
            </li>
          </ul>
        </div>

     
        <div>
          <h4 className="text-lg font-semibold mb-4 text-red-400">About</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-red-500 transition duration-300">API Source: TMDB</a></li>
            <li><a href="#" className="hover:text-red-500 transition duration-300">GitHub Repo</a></li>
            <li><a href="#" className="hover:text-red-500 transition duration-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-red-500 transition duration-300">Terms of Use</a></li>
          </ul>
        </div>

      
        <div>
          <h4 className="text-lg font-semibold mb-4 text-red-400">Follow Us</h4>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-red-500 transition-all"><FaFacebookF /></a>
            <a href="#" className="hover:text-red-500 transition-all"><FaTwitter /></a>
            <a href="#" className="hover:text-red-500 transition-all"><FaInstagram /></a>
            <a href="#" className="hover:text-red-500 transition-all"><FaGithub /></a>
          </div>
          <p className="text-xs text-gray-500 mt-6">© {new Date().getFullYear()} CineFlix. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
