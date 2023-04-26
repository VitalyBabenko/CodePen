import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShowing: false,
  message: '',
  color: '',
};

export const goMessageSlice = createSlice({
  name: 'goMessage',
  initialState,
  reducers: {
    clearMessage(state) {
      state.isShowing = false;
    },

    showSuccessMessage(state, action) {
      state.isShowing = true;
      state.message = action.payload;
      state.color = '#46CF73';
    },

    showWarningMessage(state, action) {
      state.isShowing = true;
      state.message = action.payload;
      state.color = '#ffdd40';
    },

    showErrorMessage(state, action) {
      state.isShowing = true;
      state.message = action.payload;
      state.color = '#ff3b41';
    },
  },
});

export const { showSuccessMessage, showWarningMessage, showErrorMessage, clearMessage } = goMessageSlice.actions;
