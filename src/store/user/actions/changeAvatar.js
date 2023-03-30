import { createAsyncThunk } from '@reduxjs/toolkit';
import { getGql } from '../../../services/api';
import { uploadImage } from './uploadImage';

export const changeAvatar = createAsyncThunk(
  'user/changeAvatar',

  async ({ user, file }, { rejectWithValue, dispatch }) => {
    const gql = getGql();

    console.log({ user, file });

    try {
      const imageAction = await dispatch(uploadImage(file));

      if (!imageAction.payload._id) {
        return rejectWithValue('Something went wrong please try again.');
      }

      const response = await gql.request(
        `
            mutation setAvatar{
              UserUpsert(user:{_id: "${user.id}", avatar: {_id: "${imageAction.payload._id}"}}){
                  _id,
                  avatar{
                      _id
                      url
                      text
                      userAvatar {
                        login
                      }
                  }
              }
          }
          `
      );
      return response.UserUpsert.avatar.url;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Something went wrong please try again.');
    }
  }
);
