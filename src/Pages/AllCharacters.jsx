import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import banner from "../assets/banner1.webp";
import { setCharacter } from "../reducers/animeSlice";
import Load from "../Components/Load";
import Banner from "../Components/Banner";
import { fetchCharacters, fetchSearchCharacter } from "../utils/api";
import Back from "../Components/Back";
import { Link } from "react-router-dom";

const AllCharacters = () => {
  const dispatch = useDispatch();
  const { character } = useSelector((store) => store.anime);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  const characterFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchCharacters(page);
      dispatch(setCharacter(result));
    } catch (err) {
      console.error("Character fetch error:", err.message);
      setError("Failed to load character list. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetchSearchCharacter(query);
      dispatch(setCharacter(response));
      setQuery("");
    } catch (err) {
      console.error("Search error:", err.message);
      setError("Failed to search character.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    characterFetch();
  }, [page]);

  if (loading) return <Load value="characters" />;

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg mt-10">{error}</div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Banner */}
      <Banner
        text="Explore your favorite anime Characters"
        head="All Anime Characters"
        url={banner}
      />

      {/* Back Button */}
      <div className="mb-4 px-6 md:px-10 lg:px-24 ">
        <Back />
      </div>

      {/* Search Box */}
      <div className="mb-10 w-full max-w-3xl mx-auto px-6 md:px-10 lg:px-24">
        <div className="flex flex-col sm:flex-row items-stretch bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-lg">
          <div className="flex items-center flex-1 px-4 py-2">
            <Search size={18} className="text-gray-400 mr-2 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              type="text"
              placeholder="Search Characters..."
              className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm sm:text-base"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 text-sm sm:text-base font-medium transition-all duration-200 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-gray-700"
          >
            Search
          </button>
        </div>
      </div>

      {/* Character Grid */}
      <div className="px-6 md:px-10 lg:px-24 pb-16">
        {character?.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {character.map((char) => (
                <Link
                  to={`/character/${char.mal_id}`}
                  key={char.mal_id}
                  className="group bg-gray-900/60 rounded-xl overflow-hidden transition duration-300 cursor-pointer"
                >
                  {/* Character Image */}
                  <div className="relative w-full h-60 overflow-hidden">
                    <img
                      src={char.images?.jpg?.image_url}
                      alt={char.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>

                  {/* Character Name */}
                  <div className="p-3">
                    <h3 className="text-white font-semibold text-sm sm:text-base truncate">
                      {char.name}
                    </h3>
                    {char.name_kanji && (
                      <p className="text-blue-300 text-xs mt-1 truncate">
                        {char.name_kanji}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="col-span-full flex justify-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className={`flex items-center text-sm px-3 sm:px-5 py-2 rounded-lg border border-blue-600 ${
                  page === 1
                    ? "bg-gray-800/70 text-gray-500 cursor-not-allowed"
                    : "bg-black/70 text-blue-400 hover:bg-blue-900/70 hover:text-white transition duration-300"
                }`}
              >
                <ChevronLeft size={18} className="mr-2" />
                Previous
              </button>

              <div className="flex items-center text-sm justify-center px-3 sm:px-4 py-2 bg-blue-900/50 border border-blue-800 rounded-lg text-white">
                Page {page}
              </div>

              <button
                onClick={handleNext}
                className="flex items-center cursor-pointer px-5 text-sm py-2 bg-blue-600/90 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Next
                <ChevronRight size={18} className="ml-2" />
              </button>
            </div>
          </>
        ) : (
          <p className="text-white text-center py-10 bg-black/50 backdrop-blur-sm rounded-lg">
            No characters found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllCharacters;
