import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGql } from "../../../services/api";

export const saveFiles = createAsyncThunk(
  "currentWork/saveFiles",

  async ({ id, html, css, js }) => {
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
            { type: "HTML", text: html },
            { type: "CSS", text: css },
            { type: "JS", text: js },
          ],
        }
      );

      return SnippetUpsert;
    } catch (error) {
      console.error(error);
    }
  }
);
