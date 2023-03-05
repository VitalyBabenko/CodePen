import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGql } from "../../../services/api";
import { queries } from "../../../services/queries";

export const getWorks = createAsyncThunk(
  "user/getWorks",

  async (id) => {
    const gql = getGql();
    try {
      const { SnippetFind } = await gql.request(queries.getWorks(id));
      return SnippetFind;
    } catch (error) {
      console.error(error);
    }
  }
);
