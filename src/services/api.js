import { GraphQLClient } from 'graphql-request';

const endpoint = '/graphql';

export const getGql = () => {
  return new GraphQLClient(endpoint, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json',
      Authorization: localStorage.authToken ? `Bearer ${localStorage.authToken}` : '',
    },
  });
};
