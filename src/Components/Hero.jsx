import React, { useEffect, useState } from "react";
import { fetchRandomAnime } from "../utils/api";

import AnimeImage from "./HeroSection/AnimeImage";
import AnimeDetails from "./HeroSection/AnimeDetails";
import AnimeStats from "./HeroSection/AnimeStats";
import AnimeSynopsis from "./HeroSection/AnimeSynopsis";
import AnimeGenre from "./HeroSection/AnimeGenre";
import ActionButtons from "./HeroSection/ActionButtons";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import toast from "react-hot-toast";
import { getAuth } from "firebase/auth";

const Hero = () => {
  const [anime, setAnime] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false); // NEW
  const [error, setError] = useState(null);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const getAnime = async () => {
    setLoading(true);
    setError(null);
    try {
      const randomAnime = await fetchRandomAnime();
      setAnime(randomAnime);
    } catch (err) {
      console.error("Hero getAnime error:", err.message);
      setError("Failed to load anime. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const checkIfFavourite = async (mal_id) => {
    if (!mal_id) return;
    const q = query(collection(db, "favorites"), where("mal_id", "==", mal_id));
    const querySnapshot = await getDocs(q);
    setIsFavourite(!querySnapshot.empty);
  };

  const next = () => {
    navigate(`/anime/details/${anime.mal_id}`);
  };

  useEffect(() => {
    getAnime();
  }, []);

  // Whenever anime changes, check if it's in favourites
  useEffect(() => {
    if (anime?.mal_id) {
      checkIfFavourite(anime.mal_id);
    }
  }, [anime]);

  const handleAddFavourite = async () => {
    if (isFavourite) return; // prevent extra calls
    setButtonDisable(true);
    try {
      const q = query(
        collection(db, "favorites"),
        where("mal_id", "==", anime.mal_id)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.error("Already added to favourites!");
        setIsFavourite(true);
        return;
      }

      await addDoc(collection(db, "favorites"), {
        userId: currentUser.uid,
        mal_id: anime.mal_id,
        title: anime.title,
        images: anime.images, // save full images object for flexibility
        score: anime.score || null,
        type: anime.type || null,
        episodes: anime.episodes || null,
        synopsis: anime.synopsis || null,
        addedAt: serverTimestamp(),
      });

      setIsFavourite(true); // update state
      toast.success("Added to favourites!");
    } catch (error) {
      console.error("Error adding favourite:", error);
      toast.error("Something went wrong!");
    } finally {
      setButtonDisable(false);
    }
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="text-center text-red-500 text-xl mt-10">{error}</div>
    );

  return (
    <div className="min-h-[40vh] mt-18 relative flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${
            anime?.images?.webp?.large_image_url ||
            anime?.images?.webp?.image_url
          })`,
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      <div className="max-w-7xl w-full md:p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="flex flex-col lg:flex-row">
          <AnimeImage anime={anime} />
          <div className="w-full lg:w-3/5 p-0 md:p-8">
            <AnimeDetails anime={anime} />
            <AnimeStats anime={anime} />
            <AnimeSynopsis anime={anime} />
            <AnimeGenre anime={anime} />
            <ActionButtons
              next={next}
              getAnime={getAnime}
              handleAddFavourite={handleAddFavourite}
              buttonDisable={buttonDisable}
              isFavourite={isFavourite} // NEW
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
