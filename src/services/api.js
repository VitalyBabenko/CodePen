import { GraphQLClient } from 'graphql-request';

const proxy = 'http://snippet.node.ed.asmer.org.ua';

export const getGql = (endpoint = `${proxy}/graphql`) => {
  return new GraphQLClient(endpoint, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json',
      Authorization: localStorage.authToken
        ? `Bearer ${localStorage.authToken}`
        : '',
    },
  });
};
