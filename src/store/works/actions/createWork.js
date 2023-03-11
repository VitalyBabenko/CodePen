import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGql } from "../../../services/api";

export const createWork = createAsyncThunk(
  "work/create",

  async ({ title, description }, { rejectWithValue }) => {
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
              { text: "", type: "HTML" },
              { text: "", type: "CSS" },
              { text: "", type: "JS" },
            ],
          },
        }
      );

      if (response.SnippetUpsert) {
        return response.SnippetUpsert;
      } else {
        return rejectWithValue("Failed to create work, please try again");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to create work, please try again");
    }
  }
);
