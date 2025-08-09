/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Load from "./Load";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CharacterCard from "./CharacterCard";
import { setCharacter } from "../reducers/animeSlice";
import { fetchCharacters } from "../utils/api";

const Characters = () => {
  const dispatch = useDispatch();
  const { character } = useSelector((store) => store.anime);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const characterFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchCharacters();
      dispatch(setCharacter(result));
    } catch (err) {
      console.error("Character fetch error:", err.message);
      setError("Failed to load character list. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    characterFetch();
  }, []);

  if (loading) return <Load value="characters" />;
  if (error) {
    return (
      <div className="text-center text-red-500 text-lg mt-10">{error}</div>
    );
  }

  return (
    <div className="bg-black py-6 px-4 sm:px-6 md:px-10  lg:px-28">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Top Characters
        </h2>
        <Link
          to="/allCharacters"
          className="inline-flex items-center gap-2 text-xs sm:text-base border border-blue-600 text-blue-400 hover:bg-blue-800 hover:text-white px-2 sm:px-5 py-2 rounded-lg font-medium sm:font-semibold transition-all duration-300 whitespace-nowrap"
        >
          View More
          <ArrowRight size={16} className="shrink-0" />
        </Link>
      </div>

      {character?.length > 0 ? (
        <div className="flex overflow-x-auto no-scrollbar gap-4 sm:gap-6 pb-2">
          {character.map((char, index) => (
            <CharacterCard key={char.mal_id || index} char={char} />
          ))}
        </div>
      ) : (
        <p className="text-white">No characters found.</p>
      )}
    </div>
  );
};

export default Characters;
