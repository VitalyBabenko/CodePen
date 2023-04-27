import { createAsyncThunk } from '@reduxjs/toolkit';
import { getGql } from '../../../services/api';
import { showErrorMessage, showSuccessMessage } from '../../goMessage/goMessageSlice';

export const createWork = createAsyncThunk(
  'work/create',

  async ({ title, description }, { rejectWithValue, dispatch }) => {
    const gql = getGql();
    try {
      const response = await gql.request(
        `
            mutation addWork($snippet: SnippetInput!) {
              SnippetUpsert(snippet: $snippet) {
                _id
                title
                description
                files {
                  _id
                  text
                  type
                }
              }
            }
          `,
        {
          snippet: {
            title: title,
            description: description,
            files: [
              { text: '', type: 'HTML' },
              { text: '', type: 'CSS' },
              { text: '', type: 'JS' },
            ],
          },
        }
      );

      if (response.SnippetUpsert) {
        dispatch(showSuccessMessage('Work created.'));
        return response.SnippetUpsert;
      } else {
        return rejectWithValue('Failed to create work, please try again');
      }
    } catch (error) {
      console.error(error);
      dispatch(showErrorMessage('Failed to create work, please try again'));
      return rejectWithValue('Failed to create work, please try again');
    }
  }
);
