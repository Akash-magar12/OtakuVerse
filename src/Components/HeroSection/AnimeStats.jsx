import { formatNumber } from "../../utils/const.js";
import { Calendar, Film, Heart, Users } from "lucide-react";

const AnimeStats = ({ anime }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {[
        {
          label: "Episodes",
          value: anime?.episodes,
          icon: <Film className="h-5 w-5 text-gray-300 mb-1" />,
        },
        {
          label: "Year",
          value: anime?.aired?.from
            ? new Date(anime.aired.from).getFullYear()
            : "?",
          icon: <Calendar className="h-5 w-5 text-gray-300 mb-1" />,
        },
        {
          label: "Members",
          value: formatNumber(anime?.members),
          icon: <Users className="h-5 w-5 text-gray-300 mb-1" />,
        },
        {
          label: "Favorites",
          value: formatNumber(anime?.favorites),
          icon: <Heart className="h-5 w-5 text-gray-300 mb-1" />,
        },
      ].map((stat, index) => (
        <div
          key={index}
          className="bg-gray-900/50 p-4 rounded-xl flex flex-col items-center"
        >
          {stat.icon}
          <span className="text-sm text-gray-400">{stat.label}</span>
          <span className="text-lg font-bold text-white">
            {stat.value || "?"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AnimeStats;
