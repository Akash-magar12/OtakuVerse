import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    isLogin: true,
  },
  reducers: {
    showLogin: (state) => {
      state.isLogin = true;
    },
    showSignup: (state) => {
      state.isLogin = false;
    },
  },
});

export const { showLogin, showSignup } = toggleSlice.actions;
export default toggleSlice.reducer;
