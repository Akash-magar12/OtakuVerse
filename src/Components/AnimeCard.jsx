import { Link } from "react-router-dom";

const AnimeCard = ({ anime }) => {
  if (!anime || anime.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-200">No anime found. Try again later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
      {anime.map((item, index) => (
        <Link
          key={`${item.mal_id}-${index}`}
          to={`/anime/details/${item.mal_id}`}
          className="block rounded-lg overflow-hidden transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <div className="group relative h-full shadow-md bg-gray-900 rounded-lg overflow-hidden">
            {/* Poster */}
            <div className="relative pb-[140%] sm:pb-[130%] md:pb-[120%] overflow-hidden">
              <img
                src={
                  item.images?.webp?.large_image_url ||
                  item.images?.webp?.image_url ||
                  "/api/placeholder/300/450"
                }
                alt={item.title}
                className="absolute top-0 left-0 w-full h-full object-cover transition duration-300 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/api/placeholder/300/450";
                }}
              />
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2">
              <h3 className="text-white font-medium text-sm truncate">
                {item.title}
              </h3>
            </div>

            {/* Hover content (hidden on touch devices) */}
            <div className="absolute inset-0 bg-black/90 text-white opacity-0 group-hover:opacity-100 transition duration-300 p-2 sm:p-3 hidden sm:flex flex-col justify-center">
              <h3 className="font-bold text-sm sm:text-base mb-2 line-clamp-2">
                {item.title}
              </h3>

              <div className="flex flex-wrap gap-1 mb-2 text-xs">
                {item.score && (
                  <span className="bg-blue-500 px-2 py-0.5 rounded-full">
                    {item.score}
                  </span>
                )}
                {item.type && (
                  <span className="bg-gray-700 px-2 py-0.5 rounded-full">
                    {item.type}
                  </span>
                )}
                {item.episodes && (
                  <span className="bg-gray-700 px-2 py-0.5 rounded-full">
                    {item.episodes} ep
                  </span>
                )}
              </div>

              {item.synopsis && (
                <p className="text-gray-300 text-xs line-clamp-3">
                  {item.synopsis}
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AnimeCard;
