import React from "react";
import { Link } from "react-router-dom";

const CharacterCard = ({ char }) => {
  return (
    <Link
      to={`/character/${char.mal_id}`}
      className="group flex-shrink-0 w-[150px] sm:w-[180px] bg-black/60 backdrop-blur border border-gray-700 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {/* Image Wrapper */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={char.images?.webp?.image_url || "/api/placeholder/300/450"}
          alt={char.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/api/placeholder/300/450";
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-white font-semibold text-sm sm:text-base truncate">
            {char.name}
          </h3>
          {char.name_kanji && (
            <p className="text-gray-400 text-xs truncate">
              {char.name_kanji}
            </p>
          )}
        </div>

        {/* Favorites */}
        <div className="flex items-center mt-2 text-xs sm:text-sm">
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center">
            <span className="mr-1">♥</span>
            <span>{char.favorites?.toLocaleString() || 0}</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;
