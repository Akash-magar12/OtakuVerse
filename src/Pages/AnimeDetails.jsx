import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Recommendations from "../components/Recommendations";
import {
  Star,
  Users,
  Eye,
  Heart,
  BarChart4,
  ExternalLink,
  Info,
  PlayCircle,
  Calendar,
  Clock,
  Type,
  Award,
} from "lucide-react";
import { setAnimeDetail } from "../reducers/animeSlice";
import Load from "../Components/Load";
import { fetchAnimeDetails } from "../utils/api";
import AnimeCharacter from "../Components/AnimeCharacter";

const AnimeDetails = () => {
  const dispatch = useDispatch();
  const { animeDetail } = useSelector((store) => store.anime);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchDetails = async () => {
    try {
      const response = await fetchAnimeDetails(id);
      dispatch(setAnimeDetail(response));
    } catch (err) {
      setError("Something went wrong while fetching anime details.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Load value="anime details" />;

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg mt-10">{error}</div>
    );
  }

  const {
    title,
    title_english,
    title_japanese,
    images,
    synopsis,
    background,
    score,
    rank,
    popularity,
    members,
    favorites,
    status,
    aired,
    duration,
    rating,
    season,
    year,
    studios,
    genres,
    themes,
    demographics,
    producers,
    episodes,
    streaming,
    trailer,
  } = animeDetail;

  // Top stats for hero section
  const topStats = [
    {
      icon: <Star size={20} className="text-yellow-400" />,
      value: score || "N/A",
      label: "Score",
    },
    {
      icon: <BarChart4 size={20} className="text-blue-400" />,
      value: rank ? `#${rank}` : "N/A",
      label: "Rank",
    },
    {
      icon: <Users size={20} className="text-green-400" />,
      value: popularity ? `#${popularity}` : "N/A",
      label: "Popularity",
    },
  ];

  // Information items for display
  const infoItems = [
    {
      icon: <Type size={16} />,
      label: "Format",
      value: animeDetail.type || "N/A",
    },
    { icon: <Info size={16} />, label: "Episodes", value: episodes || "N/A" },
    { icon: <Info size={16} />, label: "Status", value: status || "N/A" },
    {
      icon: <Calendar size={16} />,
      label: "Aired",
      value: aired?.string || "N/A",
    },
    {
      icon: <Calendar size={16} />,
      label: "Season",
      value:
        season && year
          ? `${season.charAt(0).toUpperCase() + season.slice(1)} ${year}`
          : "N/A",
    },
    { icon: <Clock size={16} />, label: "Duration", value: duration || "N/A" },
    { icon: <Award size={16} />, label: "Rating", value: rating || "N/A" },
  ];

  // Social stats
  const socialStats = [
    {
      icon: <Eye size={18} />,
      label: "Members",
      value: members ? members.toLocaleString() : "N/A",
    },
    {
      icon: <Heart size={18} />,
      label: "Favorites",
      value: favorites ? favorites.toLocaleString() : "N/A",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white max-w-8xl">
      {/* Hero Banner */}
      <div className="relative w-full">
        {/* Banner Image */}
        {images?.jpg?.large_image_url && (
          <div className="absolute inset-0 w-full h-full">
            <div className="w-full h-64 md:h-96 overflow-hidden">
              <img
                src={images.jpg.large_image_url}
                alt={title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black"></div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative pt-40 md:pt-64 pb-8 px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="flex-shrink-0 -mt-20 md:-mt-32 z-10">
              <div className="w-40 md:w-64 rounded-lg overflow-hidden shadow-2xl border-4 border-gray-800">
                {images?.jpg?.large_image_url ? (
                  <img
                    src={images.jpg.large_image_url}
                    alt={title}
                    className="w-full h-auto"
                  />
                ) : (
                  <div className="bg-black h-60 flex items-center justify-center">
                    <span>No Image</span>
                  </div>
                )}
              </div>

              {/* Top Stats (Mobile) */}
              <div className="md:hidden grid grid-cols-3 gap-2 mt-4">
                {topStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center bg-gray-900 rounded-lg p-2"
                  >
                    <div className="flex items-center gap-1">{stat.icon}</div>
                    <div className="font-bold text-lg">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Title and Info */}
            <div className="flex-1 mt-4 md:mt-0">
              <div className="flex flex-col md:flex-row md:items-end justify-between">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-2">
                    {title}
                  </h1>
                  {title_english && title_english !== title && (
                    <h2 className="text-xl text-gray-300">{title_english}</h2>
                  )}
                  {title_japanese && (
                    <h3 className="text-sm text-gray-400 mt-1">
                      {title_japanese}
                    </h3>
                  )}
                </div>

                {/* Top Stats (Desktop) */}
                <div className="hidden md:flex gap-4 mt-4 md:mt-0">
                  {topStats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center bg-gray-900 rounded-lg p-3 min-w-20"
                    >
                      <div className="flex items-center gap-1">{stat.icon}</div>
                      <div className="font-bold text-lg">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Genres/Tags */}
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {genres?.map((genre) => (
                    <span
                      key={genre.mal_id}
                      className="px-3 py-1 bg-blue-600/30 border border-blue-500/50 text-blue-200 text-xs rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                  {themes?.map((theme) => (
                    <span
                      key={theme.mal_id}
                      className="px-3 py-1 bg-purple-600/30 border border-purple-500/50 text-purple-200 text-xs rounded-full"
                    >
                      {theme.name}
                    </span>
                  ))}
                  {demographics?.map((demo) => (
                    <span
                      key={demo.mal_id}
                      className="px-3 py-1 bg-green-600/30 border border-green-500/50 text-green-200 text-xs rounded-full"
                    >
                      {demo.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Info Summary */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                {infoItems.slice(0, 6).map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-gray-400">{item.icon}</span>
                    <div>
                      <span className="text-xs text-gray-400">
                        {item.label}:{" "}
                      </span>
                      <span className="text-sm">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Synopsis, Trailer & Background */}
          <div className="lg:col-span-2 space-y-8">
            {/* Synopsis */}
            {synopsis && (
              <div className="bg-black rounded-xl p-6 shadow-lg border border-gray-800">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  Synopsis
                </h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 whitespace-pre-line">
                    {synopsis}
                  </p>
                </div>
              </div>
            )}

            {/* Trailer Section */}
            {trailer?.youtube_id && (
              <div className="bg-black rounded-xl p-6 shadow-lg border border-gray-800">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <PlayCircle size={24} className="text-red-500" />
                  Trailer
                </h3>
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-gray-800">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${trailer.youtube_id}`}
                    title={`${title} Trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Background */}
            {background && (
              <div className="bg-black rounded-xl p-6 shadow-lg border border-gray-800">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  Background
                </h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 whitespace-pre-line">
                    {background}
                  </p>
                </div>
              </div>
            )}

            {/* If no info is available */}
            {!background && !synopsis && !trailer?.youtube_id && (
              <div className="bg-black rounded-xl p-6 shadow-lg border border-gray-800 flex items-center justify-center">
                <p className="text-gray-400">
                  No additional information available.
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Stats & Information */}
          <div className="space-y-8">
            {/* Information Card */}
            <div className="bg-black rounded-xl p-6 shadow-lg border border-gray-800">
              <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-800">
                Information
              </h3>

              <div className="space-y-4">
                {infoItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">{item.icon}</span>
                      <span className="text-gray-300">{item.label}</span>
                    </div>
                    <span className="text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Studios */}
              {studios && studios.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-800">
                  <h4 className="text-gray-300 font-medium mb-3">Studios</h4>
                  <div className="flex flex-wrap gap-2">
                    {studios.map((studio) => (
                      <span
                        key={studio.mal_id}
                        className="px-3 py-1 bg-black text-white text-xs rounded-lg border border-gray-700"
                      >
                        {studio.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Producers */}
              {producers && producers.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-800">
                  <h4 className="text-gray-300 font-medium mb-3">Producers</h4>
                  <div className="flex flex-wrap gap-2">
                    {producers.map((producer) => (
                      <span
                        key={producer.mal_id}
                        className="px-3 py-1 bg-black text-white text-xs rounded-lg border border-gray-700"
                      >
                        {producer.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Stats */}
              <div className="mt-6 pt-4 border-t border-gray-800">
                <h4 className="text-gray-300 font-medium mb-3">Community</h4>
                <div className="grid grid-cols-2 gap-3">
                  {socialStats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-black rounded-lg p-3 flex flex-col items-center text-center"
                    >
                      <div className="text-gray-400 mb-1">{stat.icon}</div>
                      <div className="font-bold text-lg">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Streaming */}
            {streaming && streaming.length > 0 && (
              <div className=" rounded-xl p-6 shadow-lg border border-gray-800">
                <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-800">
                  Where to Watch
                </h3>
                <div className="space-y-3">
                  {streaming.map((stream, index) => (
                    <a
                      key={index}
                      href={stream.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-black hover:bg-gray-700 rounded-lg transition-colors border border-gray-700"
                    >
                      <span>{stream.name}</span>
                      <ExternalLink size={16} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <AnimeCharacter />
      <Recommendations />
    </div>
  );
};

export default AnimeDetails;
