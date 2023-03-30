import { createSlice } from '@reduxjs/toolkit';
import { changeAvatar } from './actions/changeAvatar';
import { fetchUser } from './actions/fetchUser';
import { uploadImage } from './actions/uploadImage';

const initialState = {
  id: '',
  login: '',
  nick: '',
  avatar: '',
  isLoading: false,
};

const proxy = 'http://snippet.node.ed.asmer.org.ua/';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });
    // fetch user
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.id = action.payload._id;
      state.login = action.payload.login;
      state.avatar = `${proxy}${action.payload.avatar.url}`;
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // upload image
    builder.addCase(uploadImage.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(uploadImage.fulfilled, (state) => {
      state.isLoading = false;
    });

    builder.addCase(uploadImage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // changeAvatar
    builder.addCase(changeAvatar.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changeAvatar.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(changeAvatar.fulfilled, (state, action) => {
      state.avatar = `${proxy}${action.payload}`;
    });
  },
});
