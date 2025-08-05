import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Recommandation = ({ id, type }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (!id || !type) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}/recommendations`,
          {
            params: {
              api_key: "0c71655fa1788be5f1840ee6488c5e1e", // ⛳ Replace this with your actual API key
              language: "en-US",
            },
          }
        );
        setRecommendations(res.data.results || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchData();
  }, [id, type]);

  if (!recommendations.length) return null;

  return (
    <div className="p-4 mt-10">
      <h2 className="text-2xl font-bold text-white mb-4">
        Recommended For You
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {recommendations.map((item) => (
          <Link key={item.id} to={`/${type}/${item.id}`}>
            <div className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition">
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={item.title || item.name}
                className="w-full h-64 object-cover"
              />
              <p className="text-white text-sm p-2 truncate text-center">
                {item.title || item.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recommandation;
