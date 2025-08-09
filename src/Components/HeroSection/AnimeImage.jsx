import { Star } from "lucide-react";

const AnimeImage = ({ anime }) => {
  return (
    <div className="w-full h-[82vh] lg:w-2/5">
      <div className="relative h-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10"></div>
        <img
          src={
            anime?.images?.webp.large_image_url || "/path/to/fallback-image.jpg"
          }
          alt={anime?.title}
          className="w-full h-full object-cover object-center rounded-xl"
        />
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Star className="h-4 w-4 text-white" fill="white" />
            {anime?.score || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeImage;
