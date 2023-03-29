import { createAsyncThunk } from '@reduxjs/toolkit';
import { getGql } from '../../../services/api';

export const uploadAvatar = createAsyncThunk(
  'user/uploadAvatar',

  async (file, { rejectWithValue }) => {
    const gql = getGql('/upload');

    try {
      const fromData = new FormData();
      fromData.append('image', file);

      fetch('/upload', {
        method: 'POST',
        headers: localStorage.authToken
          ? { Authorization: 'Bearer ' + localStorage.authToken }
          : {},
        body: fromData,
      })
        .then((res) => res.json())
        .then((res) => console.log('UPLOAD RESULT', res));

      //   const response = await gql.request(
      //     `
      //     mutation uploadImage($image: ImageInput!) {
      //       ImageUpsert(image: $image) {
      //         _id
      //         text
      //         url
      //       }
      //     }
      //     `,
      //     {
      //       fromData,
      //     }
      //   );

      //   console.log(response.ImageUpsert);
    } catch (error) {
      console.log(error);
      return rejectWithValue('Something went wrong please try again.');
    }
  }
);
