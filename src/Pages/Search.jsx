import React, { useState } from "react";
import { Search } from "lucide-react";
import { fetchSearchAnime } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setSearchAnime } from "../reducers/animeSlice";
import Load from "../Components/Load";
import AnimeCard from "../Components/AnimeCard";

const Searched = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { searchAnime } = useSelector((store) => store.anime);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchSearch();
    }
  };

  const fetchSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetchSearchAnime(searchQuery);
      setSearchQuery("");
      dispatch(setSearchAnime(response));
    } catch (err) {
      setError("Something went wrong while searching.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 md:px-10 lg:px-20 mt-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-6 ">
          Discover <span className="text-gray-400">Anime</span>
        </h1>

        {/* Enhanced Search Bar */}
        <div className="relative mb-10 w-full max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-lg">
            {/* Icon + Input */}
            <div className="flex items-center flex-1 px-4 py-3">
              <Search size={18} className="text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
                placeholder="Search anime titles..."
                className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm sm:text-base"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={fetchSearch}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 text-sm sm:text-base font-medium transition-all duration-200 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-gray-700"
            >
              Search
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center mb-8">
            <p className="text-red-400 text-sm bg-red-900/30 py-2 px-4 rounded-lg inline-block">
              {error}
            </p>
          </div>
        )}

        {loading ? (
          <Load value="anime" />
        ) : (
          <>
            {/* Results Count */}
            {searchAnime.length > 0 && (
              <p className="text-gray-400 mb-6 text-sm md:text-base">
                Found{" "}
                <span className="text-white font-medium">
                  {searchAnime.length}
                </span>{" "}
                results
              </p>
            )}

            {/* Display fallback if no anime found */}
            {searchAnime.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl text-white font-medium mb-2">
                  No results yet
                </h3>
                <p className="text-gray-400 text-center max-w-md">
                  Search for your favorite anime titles to discover detailed
                  information, ratings, and more.
                </p>
              </div>
            )}

            {/* Use AnimeCard to display results */}
            {searchAnime.length > 0 && <AnimeCard anime={searchAnime} />}
          </>
        )}
      </div>
    </section>
  );
};

export default Searched;
