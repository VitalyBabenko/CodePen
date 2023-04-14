import { createSlice } from '@reduxjs/toolkit';
import { changeAvatar } from './actions/changeAvatar';
import { fetchUser } from './actions/fetchUser';
import { uploadImage } from './actions/uploadImage';
import { changePassword } from './actions/changePassword';
import initialUserAvatar from '../../assets/img/initialUserImage.jpeg';

const initialState = {
  id: '',
  login: '',
  nick: '',
  avatar: initialUserAvatar,
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
      if (action.payload?.avatar?.url) {
        state.avatar = `/${action.payload.avatar.url}`;
      } else {
        state.avatar = initialUserAvatar;
      }
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

    // changePassword
    builder.addCase(changePassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changePassword.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.isLoading = false;
    });
  },
});
