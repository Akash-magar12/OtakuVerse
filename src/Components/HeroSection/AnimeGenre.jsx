
const AnimeGenre = ({ anime }) => {
  return (
    anime?.genres?.length > 0 && (
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2 text-white">Genres</h2>
        <div className="flex flex-wrap gap-2">
          {anime.genres.map((genre) => (
            <span
              key={genre.mal_id}
              className="px-3 py-1 bg-gray-900/80 rounded-full text-xs font-medium text-gray-200 hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    )
  );
};

export default AnimeGenre;
