import { GraphQLClient } from 'graphql-request';

export const getGql = (endpoint = `/graphql`) => {
  return new GraphQLClient(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json',
      Authorization: localStorage.authToken ? `Bearer ${localStorage.authToken}` : '',
    },
  });
};
