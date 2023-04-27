import { createAsyncThunk } from '@reduxjs/toolkit';
import initialUserAvatar from '../../../assets/img/initialUserImage.jpeg';
import { getGql } from '../../../services/api';
import { showErrorMessage, showSuccessMessage } from '../../goMessage/goMessageSlice';
import { uploadImage } from './uploadImage';

export const changeAvatar = createAsyncThunk(
  'user/changeAvatar',

  async ({ user, file }, { rejectWithValue, dispatch }) => {
    const gql = getGql();

    try {
      const imageAction = await dispatch(uploadImage(file));

      if (!imageAction.payload._id) {
        return rejectWithValue('Something went wrong please try again.');
      }

      const response = await gql.request(
        `
        mutation setAvatar($userId: String!, $imageId: ID!) {
          UserUpsert(
            user: {
              _id: $userId,
              avatar: {
                _id: $imageId
              }
            }
          ) {
            _id
            avatar {
              url
            }
          }
        }
        `,
        {
          userId: user.id,
          imageId: imageAction.payload._id,
        }
      );
      dispatch(showSuccessMessage('Profile Image uploaded.'));
      if (response.UserUpsert.avatar.url) {
        return response.UserUpsert.avatar.url;
      } else {
        return initialUserAvatar;
      }
    } catch (error) {
      dispatch(showErrorMessage('Something went wrong please try again.'));
      console.error(error);
      return rejectWithValue('Something went wrong please try again.');
    }
  }
);
