import { createSlice } from '@reduxjs/toolkit';
import { changeAvatar } from './actions/changeAvatar';
import { fetchUser } from './actions/fetchUser';
import { uploadAvatar } from './actions/uploadAvatar';

const initialState = {
  id: '',
  login: '',
  nick: '',
  avatar: {},
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAvatar(state, action) {
      state.avatar = action.payload;
    },
  },
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

    builder.addCase(uploadAvatar.fulfilled, (state, action) => {
      console.log(action.payload);
    });

    builder.addCase(changeAvatar.fulfilled, (state, action) => {
      state.avatar = action.payload.avatar;
    });
  },
});

export const { setAvatar } = userSlice.actions;
