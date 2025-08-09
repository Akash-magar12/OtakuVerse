import { Sparkles } from "lucide-react";

const ActionButtons = ({ getAnime, next }) => {
  return (
    <div className="flex flex-wrap gap-4 pb-8 sm:pb-0 mt-8">
      <button
        onClick={next}
        className="px-6 py-3 cursor-pointer bg-gray-900/80 border border-gray-600/50 rounded-xl text-white font-medium transition-all duration-300 hover:bg-gray-800 flex items-center gap-2"
      >
        View Details
      </button>
      <button
        onClick={getAnime}
        className="px-6 py-3 cursor-pointer bg-gray-900/80 border border-gray-600/50 rounded-xl text-white font-medium transition-all duration-300 hover:bg-gray-800 flex items-center gap-2"
      >
        <Sparkles className="h-5 w-5" />
        Next Anime
      </button>
    </div>
  );
};

export default ActionButtons;
