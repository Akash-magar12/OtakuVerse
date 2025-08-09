import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenreDetails } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import { setGenreDetails } from "../reducers/animeSlice";
import Load from "../Components/Load";
import Back from "../Components/Back";
import AnimeCard from "../Components/AnimeCard";

const GenreDetails = () => {
  const dispatch = useDispatch();
  const { genreDetails } = useSelector((store) => store.anime);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchGenreDetails(id);
      dispatch(setGenreDetails(result));
    } catch (err) {
      console.error("Genre fetch error:", err.message);
      setError("Failed to load anime list. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Load value="genre anime" />;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="bg-black mt-16 min-h-screen px-6 md:px-10 lg:px-20 py-10">
      <h2 className="text-4xl font-bold text-white mb-8">
        Genre Anime Results
      </h2>
      <Back />

      {genreDetails?.length > 0 ? (
        <AnimeCard anime={genreDetails} />
      ) : (
        <p className="text-white text-center">No anime found for this genre.</p>
      )}
    </div>
  );
};

export default GenreDetails;
