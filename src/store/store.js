// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "../reducers/toggleSlice"; // adjust the path if needed

const store = configureStore({
  reducer: {
    toggle: toggleReducer,

  },
});

export default store;
