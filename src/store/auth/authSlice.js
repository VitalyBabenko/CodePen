import { createSlice } from '@reduxjs/toolkit';
import { login } from './actions/loginAction';
import { registration } from './actions/registrationAction';

const initialState = {
  isAuth: localStorage.getItem('authToken') ? true : false,
  loading: false,
  error: null,
  isLoginPopupOpen: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openLoginPopup(state) {
      state.isLoginPopupOpen = true;
    },
    closeLoginPopup(state) {
      state.isLoginPopupOpen = false;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
  extraReducers: builder => {
    // login
    builder.addCase(login.pending, state => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, state => {
      state.loading = false;
      state.isAuth = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // registration
    builder.addCase(registration.pending, state => {
      state.loading = true;
    });
    builder.addCase(registration.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(registration.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout, openLoginPopup, closeLoginPopup } = authSlice.actions;
