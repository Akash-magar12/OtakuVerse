import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchRecommendations } from "../utils/api";
import Load from "./Load";
import { setRecommendations } from "../reducers/animeSlice";

const Recommendations = () => {
  const dispatch = useDispatch();
  const { recommendations } = useSelector((store) => store.anime);
  const { id } = useParams();
  const [visibleCount, setVisibleCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecommend = async () => {
    try {
      setLoading(true);
      const response = await fetchRecommendations(id);
      dispatch(setRecommendations(response));
      setError(null);
    } catch (err) {
      setError("Failed to load recommendations.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommend();
    setVisibleCount(10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const showMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const visibleRecommendations = recommendations?.slice(0, visibleCount) || [];

  return (
    <section className="px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">
          More Like This
        </h2>

        {loading ? (
          <Load value="anime" />
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : visibleRecommendations.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
              {visibleRecommendations.map((rec, index) => (
                <Link
                  to={`/anime/details/${rec.entry.mal_id}`}
                  key={`${rec.entry.mal_id}-${index}`}
                  className="block transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                >
                  <div className="group relative cursor-pointer rounded-lg overflow-hidden shadow-md h-full">
                    {/* Poster Image with aspect ratio container */}
                    <div className="relative pb-[150%] overflow-hidden">
                      <img
                        src={
                          rec.entry.images?.webp?.large_image_url ||
                          rec.entry.images?.webp?.image_url ||
                          "/api/placeholder/300/450"
                        }
                        alt={rec.entry.title}
                        className="absolute top-0 left-0 w-full h-full object-cover transition duration-300 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/api/placeholder/300/450";
                        }}
                      />
                    </div>

                    {/* Title Always Visible */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent py-2 px-2">
                      <h3 className="text-white font-medium text-xs sm:text-sm truncate">
                        {rec.entry.title}
                      </h3>
                    </div>

                    {/* Details on Hover */}
                    <div
                      className="absolute inset-0 bg-black/80 flex flex-col justify-center px-2 py-2 sm:px-3 sm:py-2
                                opacity-0 group-hover:opacity-100 transition duration-300"
                    >
                      <h3 className="text-white font-bold text-xs sm:text-sm md:text-base mb-1 line-clamp-2">
                        {rec.entry.title}
                      </h3>

                      <div className="flex flex-wrap gap-1 mb-1 sm:mb-2">
                        <span className="px-1.5 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                          {rec.entry.type || "Anime"}
                        </span>
                      </div>

                      <p className="text-gray-300 text-xs mb-1 italic hidden sm:block">
                        Recommended because of similar themes.
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {recommendations.length > visibleCount && (
              <div className="mt-6 sm:mt-8 flex justify-center">
                <button
                  onClick={showMore}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-sm sm:text-base rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Show More
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-400 text-center">
            No recommendations available.
          </p>
        )}
      </div>
    </section>
  );
};

export default Recommendations;
