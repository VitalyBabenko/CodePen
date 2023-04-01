import { createAsyncThunk } from '@reduxjs/toolkit';
import { getGql } from '../../../services/api';
import {
  showErrorMessage,
  showSuccessMessage,
} from '../../goMessage/goMessageSlice';

export const saveFiles = createAsyncThunk(
  'currentWork/saveFiles',

  async ({ id, html, css, js }, { dispatch }) => {
    const gql = getGql();
    try {
      const { SnippetUpsert } = await gql.request(
        `
        mutation SnippetUpdate($snippetId: ID!, $newFiles: [FileInput!]!) {
            SnippetUpsert(snippet: {
              _id: $snippetId,
              files: $newFiles
            }) {
              _id
              createdAt
              title
              description
              files {
                text
                type
              }
            }
          }
        `,
        {
          snippetId: id,
          newFiles: [
            { type: 'HTML', text: html },
            { type: 'CSS', text: css },
            { type: 'JS', text: js },
          ],
        }
      );

      dispatch(showSuccessMessage('Pen saved.'));
      return SnippetUpsert;
    } catch (error) {
      dispatch(showErrorMessage('Failed to save pen.'));
      console.error(error);
    }
  }
);
