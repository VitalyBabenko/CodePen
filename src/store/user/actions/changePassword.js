import { createAsyncThunk } from '@reduxjs/toolkit';
import { GraphQLClient } from 'graphql-request';

export const changePassword = createAsyncThunk(
  'user/changePassword',

  async ({ login, password, newPassword }, { rejectWithValue }) => {
    const gql = new GraphQLClient('/graphql', {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Accept: 'application/json',
      },
    });

    try {
      const response = await gql.request(
        ` 
        mutation changePassword($login: String!, $password: String!, $newPassword: String!) {
            changePassword(login: $login, password: $password, newPassword: $newPassword) {
              _id
              login
            }
          }
          `,
        {
          login,
          password,
          newPassword,
        }
      );
      return response.changePassword;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Something went wrong please try again.');
    }
  }
);
