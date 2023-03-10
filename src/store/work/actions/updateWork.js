import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGql } from "../../../services/api";
import { queries } from "../../../services/queries";

export const updateWork = createAsyncThunk(
  "work/update",

  async ({ id, html, css, js }) => {
    const gql = getGql();
    try {
      const response = await gql.request(queries.updateWork, {
        id: id,
        files: [
          { type: "HTML", text: "asdasd" },
          { type: "CSS", text: "qwewqe" },
          { type: "JS", text: "qwewqe" },
        ],
      });
      return response.SnippetFindOne;
    } catch (error) {
      console.error(error);
    }
  }
);
