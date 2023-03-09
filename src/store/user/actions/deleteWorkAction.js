import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGql } from "../../../services/api";
import { queries } from "../../../services/queries";

export const deleteWork = createAsyncThunk(
  "work/delete",

  async (id) => {
    const gql = getGql();
    try {
      const response = await gql.request(queries.deleteWork(id));
      return response.SnippetUpsert;
    } catch (error) {
      console.error(error);
    }
  }
);
