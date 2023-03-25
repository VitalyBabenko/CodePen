import { createSlice } from '@reduxjs/toolkit';
import { fetchUser } from './actions/fetchUser';

const initialState = {
  id: '',
  login: '',
  nick: '',
  avatar: '',
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.id = action.payload._id;
      state.login = action.payload.login;
      state.avatar = action.payload.avatar;
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});
