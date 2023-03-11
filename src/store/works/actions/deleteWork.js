import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGql } from "../../../services/api";

export const deleteWork = createAsyncThunk(
  "work/delete",

  async (id, { rejectWithValue }) => {
    const gql = getGql();
    try {
      const response = await gql.request(
        ` 
            mutation deleteWork($snippet: SnippetInput!) {
                SnippetUpsert(snippet: $snippet) {
                _id
                title
                description
                createdAt
                }
            }
        `,
        {
          snippet: {
            _id: id,
            title: null,
          },
        }
      );

      if (response.SnippetUpsert) {
        return response.SnippetUpsert;
      } else {
        return rejectWithValue("Failed to delete work, please try again");
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed to delete work, please try again");
    }
  }
);
