import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { bannerDetails, pathToFetch } from "../utils/const";
import Back from "../Components/Back";
import AnimeCard from "../Components/AnimeCard";
import Load from "../Components/Load";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";

const AllAnime = () => {
  const location = useLocation();
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const currentBanner = bannerDetails[location.pathname];

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchFunction = pathToFetch[location.pathname];
      if (fetchFunction) {
        const data = await fetchFunction(page);
        setAnimeList(data);
      } else {
        setError("Invalid Page");
      }
    } catch (err) {
      console.error("AllAnime fetch error:", err.message);
      setError("Failed to load anime list.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll when returning from character page

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, page]);

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg sm:text-xl mt-10 px-4">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-black mt-20 min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-10">
      {/* Banner */}
      <Banner
        text={currentBanner.text}
        head={currentBanner.head}
        url={currentBanner.url}
      />

      {/* Main Content */}
      <div className="w-full max-w-7xl relative z-10">
        <Back />
        {loading ? <Load value="anime" /> : <AnimeCard anime={animeList} />}

        {/* Pagination */}
        <div className="col-span-full pb-20 flex justify-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`flex items-center text-sm px-3 sm:px-5 py-2 rounded-lg border border-purple-600 
                          ${
                            page === 1
                              ? "bg-gray-800/70 text-gray-500 cursor-not-allowed"
                              : "bg-black/70 text-purple-400 hover:bg-purple-900/70 hover:text-white transition duration-300"
                          }`}
          >
            <ChevronLeft size={18} className="mr-2" />
            Previous
          </button>

          <div className="flex items-center text-sm justify-center px-3 sm:px-4 py-2 bg-purple-900/50 border border-purple-800 rounded-lg text-white">
            Page {page}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center px-5 text-sm py-2 bg-purple-600/90 text-white rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Next
            <ChevronRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllAnime;
