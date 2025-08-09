import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchAnimeCharacters } from "../utils/api";
import Load from "./Load";
import { setAnimeCharacter } from "../reducers/animeSlice";

const AnimeCharacter = () => {
  const dispatch = useDispatch();
  const { animeCharacter } = useSelector((store) => store.anime);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(0);

  const fetchAnimeCharacter = async () => {
    try {
      setLoading(true);
      const response = await fetchAnimeCharacters(id);
      dispatch(setAnimeCharacter(response));
      setError(null);
    } catch (err) {
      setError("Failed to load characters.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeCharacter();
    setVisibleCount(10); // reset visible count on new ID
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const showMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const visibleCharacters = animeCharacter?.slice(0, visibleCount) || [];

  return (
    <section className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 md:py-10 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">
          Characters
        </h2>

        {loading ? (
          <Load value="characters" />
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : visibleCharacters.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              {visibleCharacters.map((char, index) => (
                <Link
                  to={`/character/${char.character.mal_id}`}
                  key={`${char.character.mal_id}-${index}`}
                  className="bg-black/50 backdrop-blur-md border border-gray-700 rounded-lg sm:rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl flex flex-col"
                >
                  <div className="relative w-full pb-[140%]">
                    <img
                      src={
                        char.character.images?.webp?.image_url ||
                        "/api/placeholder/300/450"
                      }
                      alt={char.character.name}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-2 sm:p-3 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-white font-semibold text-xs sm:text-sm md:text-base truncate">
                        {char.character.name}
                      </h3>
                      {char.role && (
                        <p className="text-gray-400 text-xs truncate mt-1">
                          {char.role}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center mt-2 text-xs">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs flex items-center">
                        <span className="mr-1">♥</span>
                        <span>{char.favorites?.toLocaleString() || 0}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {animeCharacter.length > visibleCount && (
              <div className="mt-6 sm:mt-8 text-center">
                <button
                  onClick={showMore}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-zinc-900 hover:bg-zinc-800 text-white text-sm sm:text-base rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Show More
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-400 text-center">No characters found.</p>
        )}
      </div>
    </section>
  );
};

export default AnimeCharacter;
