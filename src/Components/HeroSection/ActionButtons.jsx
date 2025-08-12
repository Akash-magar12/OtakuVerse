import { HeartPlus, Sparkles } from "lucide-react";

const ActionButtons = ({
  getAnime,
  next,
  handleAddFavourite,
  buttonDisable,
  isFavourite, // NEW
}) => {
  return (
    <div className="flex flex-wrap gap-4 pb-8 sm:pb-0 mt-8">
      <button
        onClick={next}
        className="px-4 py-2 text-sm cursor-pointer bg-gray-900/80 border border-gray-600/50 rounded-xl text-white font-medium transition-all duration-300 hover:bg-gray-800 flex items-center gap-2"
      >
        View Details
      </button>

      <button
        onClick={getAnime}
        className="px-4 py-2 text-sm cursor-pointer bg-gray-900/80 border border-gray-600/50 rounded-xl text-white font-medium transition-all duration-300 hover:bg-gray-800 flex items-center gap-2"
      >
        <Sparkles className="h-5 w-5" />
        Next Anime
      </button>

      <button
        onClick={handleAddFavourite}
        disabled={buttonDisable || isFavourite}
        className={`px-4 py-2 text-sm cursor-pointer border border-gray-600/50 rounded-xl text-white font-medium transition-all duration-300 flex items-center gap-2 ${
          isFavourite
            ? "bg-green-700/80 cursor-not-allowed"
            : "bg-gray-900/80 hover:bg-gray-800"
        }`}
      >
        <HeartPlus className="h-5 w-5" />
        {isFavourite
          ? "Added"
          : buttonDisable
          ? "Adding..."
          : "Add to favourite"}
      </button>
    </div>
  );
};

export default ActionButtons;
