import { createSlice } from "@reduxjs/toolkit";
import { login } from "./loginAction";

const initialState = {
  isLogged: localStorage.getItem("authToken") ? true : false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.isLogged = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLogged = false;
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { logout } = authSlice.actions;
