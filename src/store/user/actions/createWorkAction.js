import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGql } from "../../../services/api";
import { queries } from "../../../services/queries";

export const createWork = createAsyncThunk(
  "work/create",

  async ({ title, description }) => {
    const gql = getGql();
    try {
      const response = await gql.request(queries.addWork(title, description));
      return response.SnippetUpsert;
    } catch (error) {
      console.error(error);
    }
  }
);
