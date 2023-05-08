import { createAsyncThunk } from '@reduxjs/toolkit';
import { getGql } from '../../../services/api';
import { login } from './loginAction';

export const registration = createAsyncThunk(
  'auth/registration',

  async (userData, { dispatch, rejectWithValue }) => {
    const gql = getGql();

    try {
      const { createUser } = await gql.request(
        `
          mutation registration($login: String!,$password: String!) {
            createUser(login: $login, password: $password) {
              _id
              login
            }
          }
        `,
        {
          login: userData.login,
          password: userData.password,
        }
      );

      if (createUser === null) {
        return rejectWithValue(
          'This user name is already in use, please try another one'
        );
      } else {
        dispatch(
          login({
            login: userData.login,
            password: userData.password,
          })
        );
      }
    } catch (error) {
      return rejectWithValue('Something went wrong please try again.');
    }
  }
);
