import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGql } from "../../../services/api";

export const fetchCurrentWork = createAsyncThunk(
  "currentWork/fetch",

  async (id) => {
    const gql = getGql();
    try {
      const { SnippetFindOne } = await gql.request(
        `
        query SnippetById($query: String!) {
            SnippetFindOne(query: $query) {
              _id
              title
              owner {
                _id
                login
              }
              files {
                _id
                text
                type
              }
            }
          }
        `,
        {
          query: JSON.stringify([{ _id: id }]),
        }
      );

      return SnippetFindOne;
    } catch (error) {
      console.error(error);
    }
  }
);
