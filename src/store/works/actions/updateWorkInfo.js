import { createAsyncThunk } from '@reduxjs/toolkit';
import { getGql } from '../../../services/api';
import { fetchWorks } from './fetchWorks';

export const updateWorkInfo = createAsyncThunk(
  'work/updateInfo',

  async ({ id, title, description, files }, { rejectWithValue, dispatch }) => {
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
                owner{ _id }
              }
            }
          `,
        {
          snippet: {
            _id: id,
            title: title,
            description: description,
            files,
          },
        }
      );

      if (response.SnippetUpsert) {
        const ownerId = response.SnippetUpsert.owner._id;
        dispatch(fetchWorks({ ownerId }));
        return response.SnippetUpsert;
      } else {
        return rejectWithValue('Failed to change work info, please try again');
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue('Failed to change work info, please try again');
    }
  }
);
