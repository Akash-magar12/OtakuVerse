import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "../reducers/toggleSlice";
import userSlice from "../reducers/userSlice";
import AnimeSlice from "../reducers/animeSlice";

const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    user: userSlice,
    anime: AnimeSlice,
  },
});

export default store;
