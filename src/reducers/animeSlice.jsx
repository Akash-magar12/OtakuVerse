import { createSlice } from "@reduxjs/toolkit";

const animeSlice = createSlice({
  name: "random",
  initialState: {
    anime: [],
    character: [],
    movie: [],
    genre: [],
    searchAnime: [],
    animeDetail: null,
    animeCharacter: [],
    recommendations: [],
    genreDetails: [],
    characterDetail: null,
  },
  reducers: {
    setAnime: (state, action) => {
      state.anime = action.payload;
    },
    setCharacter: (state, action) => {
      state.character = action.payload;
    },
    setMovie: (state, action) => {
      state.movie = action.payload;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    setSearchAnime: (state, action) => {
      state.searchAnime = action.payload;
    },
    setAnimeDetail: (state, action) => {
      state.animeDetail = action.payload;
    },
    setAnimeCharacter: (state, action) => {
      state.animeCharacter = action.payload;
    },
    setRecommendations: (state, action) => {
      state.recommendations = action.payload;
    },
    setGenreDetails: (state, action) => {
      state.genreDetails = action.payload;
    },
    setCharacterDetail: (state, action) => {
      state.characterDetail = action.payload;
    },
  },
});

export const {
  setAnime,
  setCharacter,
  setMovie,
  setRecommendations,
  setGenre,
  setSearchAnime,
  setAnimeDetail,
  setGenreDetails,
  setAnimeCharacter,
  setCharacterDetail,
} = animeSlice.actions;
export default animeSlice.reducer;
