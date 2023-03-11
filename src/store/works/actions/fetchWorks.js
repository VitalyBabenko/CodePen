import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGql } from "../../../services/api";

export const fetchWorks = createAsyncThunk(
  "works/fetch",

  async (id) => {
    const gql = getGql();
    try {
      const { SnippetFind } = await gql.request(
        `
          query SnippetByOwner($query: String!) {
            SnippetFind(query: $query) {
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
          query: JSON.stringify([
            {
              ___owner: {
                $in: [id],
              },
            },
          ]),
        }
      );

      // filter deleted
      return [...SnippetFind.filter((snippet) => snippet.title !== null)];
    } catch (error) {
      console.error(error);
    }
  }
);
