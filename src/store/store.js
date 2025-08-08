import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "../reducers/toggleSlice";
import userSlice from "../reducers/userSlice";

const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    user: userSlice,
  },
});

export default store;
