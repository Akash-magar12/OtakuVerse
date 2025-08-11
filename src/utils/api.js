import axios from "axios";

const JIKAN_BASE_URL = "https://api.jikan.moe/v4";

const api = axios.create({
  baseURL: JIKAN_BASE_URL,
});

// ! All Anime
export const fetchAllAnime = async (page = 1) => {
  try {
    const response = await api.get(`/anime?page=${page}`);
    return response.data.data;
  } catch (error) {
    console.error("fetchAllAnime error:", error.message);
  }
};

// ! Top Airing
export const fetchTopAiring = async (page = 1) => {
  try {
    const response = await api.get(`/top/anime?filter=airing&page=${page}`);
    return response.data.data;
  } catch (error) {
    console.error("fetchTopAiring error:", error.message);
  }
};

// ! Movies
export const fetchMovies = async (page = 1) => {
  try {
    const response = await api.get(`/top/anime?type=movie&page=${page}`);
    return response.data.data;
  } catch (error) {
    console.error("fetchMovies error:", error.message);
  }
};

// ! Upcoming Anime
export const fetchUpcoming = async (page = 1) => {
  try {
    const response = await api.get(`/top/anime?filter=upcoming&page=${page}`);
    return response.data.data;
  } catch (error) {
    console.error("fetchUpcoming error:", error.message);
  }
};

// ! Most Favorited
export const fetchFavourites = async (page = 1) => {
  try {
    const response = await api.get(`/top/anime?filter=favorite&page=${page}`);
    return response.data.data;
  } catch (error) {
    console.error("fetchFavourites error:", error.message);
  }
};

// ! Most Popular
export const fetchPopular = async (page = 1) => {
  try {
    const response = await api.get(
      `/top/anime?filter=bypopularity&page=${page}`
    );
    return response.data.data;
  } catch (error) {
    console.error("fetchPopularity error:", error.message);
  }
};

// ! Top Characters
export const fetchCharacters = async (page = 1) => {
  try {
    const response = await api.get(`/top/characters?page=${page}`);
    return response.data.data;
  } catch (error) {
    console.error("fetchCharacters error:", error.message);
  }
};

// ! Anime Characters
export const fetchAnimeCharacters = async (id) => {
  try {
    const response = await api.get(`/anime/${id}/characters`);
    return response.data.data;
  } catch (error) {
    console.error("fetchAnimeCharacters error:", error.message);
  }
};

// ! Search Anime
export const fetchSearchAnime = async (query) => {
  try {
    const response = await api.get(`/anime?q=${query}`);
    return response.data.data;
  } catch (error) {
    console.error("fetchSearchAnime error:", error.message);
  }
};

// ! Anime Details
export const fetchAnimeDetails = async (id) => {
  try {
    const response = await api.get(`/anime/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("fetchAnimeDetails error:", error.message);
  }
};

// ! Character Details
export const fetchCharacterDetails = async (id) => {
  try {
    const response = await api.get(`/characters/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("fetchCharacterDetails error:", error.message);
  }
};

// ! Get Genres
export const fetchGenres = async () => {
  try {
    const response = await api.get(`/genres/anime`);
    return response.data.data;
  } catch (error) {
    console.error("fetchGenres error:", error.message);
  }
};

// ! Anime by Genre
export const fetchGenreDetails = async (genreId, page = 1) => {
  try {
    const response = await api.get(`/anime?genres=${genreId}&page=${page}`);
    return response.data.data;
  } catch (error) {
    console.error("fetchGenreDetails error:", error.message);
  }
};

// ! Random Anime (your backend picked random from top popularity)
export const fetchRandomAnime = async () => {
  try {
    const response = await api.get(`/top/anime?filter=airing`);
    const list = response.data.data;
    return list[Math.floor(Math.random() * list.length)];
  } catch (error) {
    console.error("fetchRandomAnime error:", error.message);
  }
};

// ! Recommendations
export const fetchRecommendations = async (id) => {
  try {
    const response = await api.get(`/anime/${id}/recommendations?limit=25`);
    return response.data.data;
  } catch (error) {
    console.error("fetchRecommendations error:", error.message);
  }
};

// ! Search Character
export const fetchSearchCharacter = async (query) => {
  try {
    const response = await api.get(`/characters?q=${query}&limit=20`);
    return response.data.data;
  } catch (error) {
    console.error("fetchSearchCharacter error:", error.message);
  }
};
