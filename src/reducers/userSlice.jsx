import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,

  reducers: {
    setUser: (state, action) => action.payload,
    logOutUser: () => null,
  },
});
export const { logOutUser, setUser } = userSlice.actions;
export default userSlice.reducer;
