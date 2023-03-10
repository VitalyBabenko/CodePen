import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGql } from "../../../services/api";
import { queries } from "../../../services/queries";

export const getWork = createAsyncThunk(
  "user/get",

  async (id) => {
    const gql = getGql();
    try {
      const { SnippetFindOne } = await gql.request(queries.getWork(id));

      if (SnippetFindOne.files.length) {
        const [html, css, js] = SnippetFindOne.files;
        const { _id, title, description } = SnippetFindOne;

        const result = {
          id: _id,
          title,
          description,
          html,
          css,
          js,
        };
        return result;
      }
    } catch (error) {
      console.error(error);
    }
  }
);
