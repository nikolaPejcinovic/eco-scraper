// Utils
import { createSlice } from "@reduxjs/toolkit";
// Constants
import { AUTH } from "constants/index";

const authFromLocalStorage = JSON.parse(localStorage.getItem("auth"));

const slice = createSlice({
  name: AUTH,
  initialState: authFromLocalStorage || {
    username: "",
    token: "",
    isAuthenticated: false,
  },
  reducers: {
    setCredentials: (
      state,
      { payload: { username, accessToken, isAuthenticated } }
    ) => {
      state.username = username;
      state.token = accessToken;
      state.isAuthenticated = isAuthenticated;
    },
  },
});

export const { setCredentials } = slice.actions;

export const selectUsername = (state) => state.auth.username;

export const selectAuthentication = (state) => state.auth.isAuthenticated;

export default slice.reducer;
