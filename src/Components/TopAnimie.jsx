import React, { useEffect, useState } from "react";
import {
  fetchAllAnime,
  fetchFavourites,
  fetchMovies,
  fetchPopular,
  fetchTopAiring,
  fetchUpcoming,
} from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  Stars,
  Flame,
  Clock,
  Sparkles,
  ListVideo,
  Film,
  ArrowRight,
} from "lucide-react";
import Load from "./Load";
import { Link } from "react-router-dom";
import AnimeCard from "./AnimeCard";
import { setAnime } from "../reducers/animeSlice";

const TopAnime = () => {
  const dispatch = useDispatch();
  const { anime } = useSelector((store) => store.anime);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const tabOptions = [
    {
      label: "All Anime",
      icon: <ListVideo size={16} />,
      action: fetchAllAnime,
      path: "/allAnime",
    },
    {
      label: "Top Airing",
      icon: <Flame size={16} />,
      action: fetchTopAiring,
      path: "/topAiring",
    },
    {
      label: "Upcoming",
      icon: <Clock size={16} />,
      action: fetchUpcoming,
      path: "/upcoming",
    },
    {
      label: "Popular",
      icon: <Sparkles size={16} />,
      action: fetchPopular,
      path: "/popular",
    },
    {
      label: "Most Favorited",
      icon: <Stars size={16} />,
      action: fetchFavourites,
      path: "/mostFavorited",
    },
    {
      label: "Movies",
      icon: <Film size={16} />,
      action: fetchMovies,
      path: "/movies",
    },
  ];

  const fetchData = async (index) => {
    setLoading(true);
    setError(null);
    try {
      const result = await tabOptions[index].action();
      dispatch(setAnime(result));
    } catch (err) {
      console.error("TopAnime fetch error:", err.message);
      setError("Failed to load anime list. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  if (error)
    return (
      <div className="text-center text-red-500 text-xl mt-10">{error}</div>
    );

  return (
    <div className="min-h-screen relative flex flex-col items-center py-12 px-4 sm:px-8  overflow-hidden">
      {/* Header */}
      <div className="relative z-10 w-full max-w-7xl mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">Top Anime</h2>
        <div className="flex gap-4 flex-wrap">
          {tabOptions.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex cursor-pointer items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                activeTab === index
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl w-full relative z-10">
        {loading ? <Load value="anime" /> : <AnimeCard anime={anime} />}
      </div>
      <Link
        to={tabOptions[activeTab]?.path || "/allAnime"}
        className="flex text-sm items-center mt-10 gap-2 bg-black border border-blue-600 text-blue-400 hover:bg-blue-800 hover:text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
      >
        View More
        <ArrowRight size={18} />
      </Link>
    </div>
  );
};

export default TopAnime;
