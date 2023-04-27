import { createAsyncThunk } from '@reduxjs/toolkit';
import { getGql } from '../../../services/api';

export const fetchUser = createAsyncThunk(
  'user/Fetch',

  async (id, { rejectWithValue }) => {
    const gql = getGql();
    try {
      const response = await gql.request(
        ` 
        query GetUser($query: String!) {
            UserFindOne(query: $query) {
              _id
              login
              nick
              avatar {
                _id
                url
                text
                userAvatar {
                  _id
                }
              }
            }
          }
          `,
        {
          query: JSON.stringify([
            {
              _id: id,
            },
          ]),
        }
      );

      if (response.UserFindOne) {
        return response.UserFindOne;
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue('Something went wrong please try again.');
    }
  }
);
