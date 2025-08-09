import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RefreshCcw, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { setGenre } from "../reducers/animeSlice";
import { fetchGenres } from "../utils/api";
import Load from "../Components/Load";

const Genre = () => {
  const dispatch = useDispatch();
  const { genre } = useSelector((store) => store.anime);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const genreFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchGenres();
      dispatch(setGenre(result));
    } catch (err) {
      console.error("Genre fetch error:", err.message);
      setError("Failed to load genres. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    genreFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRetry = () => {
    genreFetch();
  };

  return (
    <div className="relative py-12 mt-16 min-h-screen px-4 sm:px-6  bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header with decorative elements */}
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl font-bold mb-6 pt-6">
            Struggling to Choose?{" "}
            <span className="text-blue-500">Discover Anime by Genre!</span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Find your next favorite series based on the categories you enjoy
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-gray-900 border-l-4 border-red-600 p-6 max-w-lg mx-auto text-center mb-10 rounded-r-md shadow-lg">
            <p className="text-red-400 text-lg mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-red-900 hover:bg-red-800 text-white px-5 py-2 rounded-md flex items-center gap-2 mx-auto transition-colors duration-200"
            >
              <RefreshCcw size={16} />
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <Load value="genres" />
        ) : (
          <div className="space-y-8">
            {/* Filter bar - decorative */}
            <div className="flex justify-between items-center px-4 py-3 bg-gray-900 rounded-lg mb-6 border border-gray-800 shadow-md">
              <div className="text-sm text-gray-400">
                {genre?.length || 0} genres available
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Filter size={16} />
                <span>Genre Types</span>
              </div>
            </div>

            {/* Genre grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {genre?.map((item) => (
                <Link
                  to={`/genre/${item.mal_id}`}
                  key={item.mal_id}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-3 rounded-md text-sm font-medium cursor-pointer transition-all duration-200 border border-gray-800 hover:border-blue-700 flex items-center justify-center text-center shadow-md hover:shadow-blue-900/20 hover:translate-y-[-2px]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Genre;
