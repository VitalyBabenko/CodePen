import { createAsyncThunk } from '@reduxjs/toolkit';
import { getGql } from '../../../services/api';
import { getUserIdFromJwt } from '../../../utils/getUserIdFromJwt';
import { fetchUser } from '../../user/actions/fetchUser';
import { fetchWorks } from '../../works/actions/fetchWorks';

export const login = createAsyncThunk(
  'auth/login',

  async (userData, { dispatch, rejectWithValue }) => {
    const gql = getGql();
    try {
      const response = await gql.request(
        ` 
        query login($login: String!,$password: String!) {
          login(login: $login, password: $password)
        }
        `,
        {
          login: userData.login,
          password: userData.password,
        }
      );

      if (response.login) {
        localStorage.setItem('authToken', response.login);

        const userId = getUserIdFromJwt(localStorage.authToken);
        dispatch(fetchWorks(userId));
        dispatch(fetchUser(userId));
      } else {
        return rejectWithValue('The username or password you entered is incorrect, please try again.');
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue('Something went wrong please try again.');
    }
  }
);
