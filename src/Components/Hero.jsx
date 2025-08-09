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

const Hero = () => {
  const [anime, setAnime] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  const next = () => {
    navigate(`/anime/details/${anime.mal_id}`);
  };
  useEffect(() => {
    getAnime();
  }, []);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="text-center text-red-500 text-xl mt-10">{error}</div>
    );

  return (
    <div className="min-h-[40vh] mt-18 relative flex items-center justify-center  px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image */}
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

      {/* Main Content */}
      <div className="max-w-7xl w-full md:p-8 rounded-2xl shadow-2xl  relative z-10">
        <div className="flex flex-col lg:flex-row">
          <AnimeImage anime={anime} />

          <div className="w-full lg:w-3/5 p-0 md:p-8">
            <AnimeDetails anime={anime} />
            <AnimeStats anime={anime} />
            <AnimeSynopsis anime={anime} />
            <AnimeGenre anime={anime} />
            <ActionButtons next={next} getAnime={getAnime} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
