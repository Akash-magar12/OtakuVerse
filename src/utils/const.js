import {
  fetchAllAnime,
  fetchMovies,
  fetchPopular,
  fetchTopAiring,
  fetchUpcoming,
} from "./api";

import all from "../assets/all.avif";
import favorite from "../assets/favorite.jpg";
import movies from "../assets/movies.jpg";
import popular from "../assets/popular.jpg";
import top from "../assets/top.avif";
import upcoming from "../assets/upcoming.avif";

export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num;
};

export const pathToFetch = {
  "/allAnime": fetchAllAnime,
  "/topAiring": fetchTopAiring,
  "/upcoming": fetchUpcoming,
  "/popular": fetchPopular,
  // Removed /mostFavorited since no such function exists
  "/movies": fetchMovies,
};

export const bannerDetails = {
  "/allAnime": {
    text: "Explore your favorite anime",
    head: "All Anime",
    url: all,
  },
  "/topAiring": {
    text: "Discover the hottest animes airing now!",
    head: "Top Airing Anime",
    url: top,
  },
  "/upcoming": {
    text: "Get ready for the upcoming adventures!",
    head: "Upcoming Anime",
    url: upcoming,
  },
  "/popular": {
    text: "Check out what's trending among fans!",
    head: "Popular Anime",
    url: popular,
  },
  "/mostFavorited": {
    text: "Fan favorites you can't miss!",
    head: "Most Favorited Anime",
    url: favorite,
  },
  "/movies": {
    text: "Experience the magic of anime movies!",
    head: "Anime Movies",
    url: movies,
  },
};
