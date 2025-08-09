
const AnimeDetails = ({anime}) => {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <span className="px-3 py-1 bg-gray-900/80 rounded-full text-xs font-medium text-gray-200">
          {anime?.type || "Unknown"}
        </span>
        <span className="px-3 py-1 bg-gray-900/80 rounded-full text-xs font-medium text-gray-200">
          {anime?.status || "Unknown"}
        </span>
      </div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-white">
        {anime?.title}
      </h1>
      <p className="text-gray-400 text-sm mb-6">{anime?.title_japanese}</p>
    </div>
  );
};

export default AnimeDetails;
