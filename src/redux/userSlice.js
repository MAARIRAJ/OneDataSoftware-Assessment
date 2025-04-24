import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    userInfo: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
    },
    signup: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
  },
});

export const { login, logout, signup } = userSlice.actions;
export default userSlice.reducer;
