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
                url
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
      console.log(response.UserFindOne);

      if (response.UserFindOne) {
        return response.UserFindOne;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue('Something went wrong please try again.');
    }
  }
);
