import { createAsyncThunk } from '@reduxjs/toolkit';

export const uploadImage = createAsyncThunk(
  'user/uploadAvatar',
  async (file, thunkAPI) => {
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
      return thunkAPI.rejectWithValue(`failed to load image`);
    }
  }
);
