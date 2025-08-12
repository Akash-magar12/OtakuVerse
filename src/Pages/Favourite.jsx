import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Favourite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user?.uid);
  const fetchFavorites = async (userId) => {
    try {
      const q = query(
        collection(db, "favorites"),
        where("userId", "==", userId)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchFavorites(userId);
    }
  }, [userId]);
  const handleDeleteFavourite = async (favId) => {
    try {
      await deleteDoc(doc(db, "favorites", favId));
      // Update UI: remove deleted favorite from state
      setFavorites((prev) => prev.filter((fav) => fav.id !== favId));
      toast.success("Favorite deleted");
      console.log("Favorite deleted:", favId);
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-20 py-10 text-white">Loading favorites...</p>
    );
  }

  if (!favorites.length) {
    return (
      <p className="text-center mt-20 py-10 text-gray-300">
        No favorites found.
      </p>
    );
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="mb-8">
        <h1 className="sm:text-3xl px-6 font-bold text-white mb-2">
          My Favorites
        </h1>
      </div>
      <div className="grid grid-cols-2 sm:px-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 p-4">
        {favorites.map((item, index) => (
          <div
            key={`${item.mal_id || item.id}-${index}`}
            className="relative group rounded-lg overflow-hidden shadow-md bg-gray-900"
          >
            {/* Delete button */}
            <button
              onClick={() => handleDeleteFavourite(item.id)}
              className="absolute cursor-pointer top-2 right-2 z-10 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 focus:outline-none flex items-center justify-center"
              title="Remove from favorites"
              aria-label="Delete favorite"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            <Link
              to={`/anime/details/${item.mal_id}`}
              className="block rounded-lg overflow-hidden transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {/* Poster */}
              <div className="relative pb-[140%] sm:pb-[130%] md:pb-[120%] overflow-hidden">
                <img
                  src={
                    item.images?.webp?.large_image_url ||
                    item.images?.webp?.image_url ||
                    item.image || // fallback if only a flat image URL is saved
                    "/api/placeholder/300/450"
                  }
                  alt={item.title}
                  className="absolute top-0 left-0 w-full h-full object-cover transition duration-300 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/api/placeholder/300/450";
                  }}
                />
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2">
                <h3 className="text-white font-medium text-sm truncate">
                  {item.title}
                </h3>
              </div>

              {/* Hover content (hidden on touch devices) */}
              <div className="absolute inset-0 bg-black/90 text-white opacity-0 group-hover:opacity-100 transition duration-300 p-2 sm:p-3 hidden sm:flex flex-col justify-center">
                <h3 className="font-bold text-sm sm:text-base mb-2 line-clamp-2">
                  {item.title}
                </h3>

                <div className="flex flex-wrap gap-1 mb-2 text-xs">
                  {item.score && (
                    <span className="bg-blue-500 px-2 py-0.5 rounded-full">
                      {item.score}
                    </span>
                  )}
                  {item.type && (
                    <span className="bg-gray-700 px-2 py-0.5 rounded-full">
                      {item.type}
                    </span>
                  )}
                  {item.episodes && (
                    <span className="bg-gray-700 px-2 py-0.5 rounded-full">
                      {item.episodes} ep
                    </span>
                  )}
                </div>

                {item.synopsis && (
                  <p className="text-gray-300 text-xs line-clamp-3">
                    {item.synopsis}
                  </p>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourite;
