import { createAsyncThunk } from '@reduxjs/toolkit';
import { GraphQLClient } from 'graphql-request';
import { getGql } from '../../services/api';
import { queries } from '../../services/queries';

const endpoint = '/graphql';

export const getUser = createAsyncThunk(
  'user/get',

  async (id) => {
    const gql = getGql();

    try {
      console.log(id);
      const response = await gql.request(queries.getInfo(id));
      console.log(response);
      return response.UserFindOne;
    } catch (error) {
      console.log('getUser Error');
      console.error(error);
    }
  },
);
