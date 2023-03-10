import { createSlice } from "@reduxjs/toolkit";
import { login } from "./actions/loginAction";
import { registration } from "./actions/registrationAction";

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
    // login
    builder.addCase(login.pending, (state) => {
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload === null) {
        state.isLogged = false;
        state.error =
          "The username or password you entered is incorrect, please try again.";
      } else {
        state.isLogged = true;
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLogged = action.payload;
      state.loading = false;
      state.error = action.error.message;
    });

    // registration
    builder.addCase(registration.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      if (action.payload === null) {
        state.error =
          "This user name is already in use, please try another one";
        state.isLogged = false;
      } else {
        state.isLogged = true;
      }
    });
    builder.addCase(registration.rejected, (state, action) => {
      state.isLogged = false;
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { logout } = authSlice.actions;
