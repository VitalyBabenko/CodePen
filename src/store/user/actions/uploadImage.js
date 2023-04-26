import { createAsyncThunk } from '@reduxjs/toolkit';
import { showErrorMessage } from '../../goMessage/goMessageSlice';

export const uploadImage = createAsyncThunk('user/uploadAvatar', async (file, { thunkAPI, dispatch }) => {
  const formData = new FormData();
  formData.append('photo', file);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.authToken}`,
      },
      body: formData,
    });
    const data = await response.json();

    return data;
  } catch (error) {
    dispatch(showErrorMessage('Something went wrong please try again.'));
    return thunkAPI.rejectWithValue(`failed to load image`);
  }
});
