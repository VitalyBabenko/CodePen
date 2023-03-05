import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGql } from "../../../services/api";
import { queries } from "../../../services/queries";

export const getUser = createAsyncThunk(
  "user/get",

  async (id) => {
    const gql = getGql();
    try {
      const response = await gql.request(queries.getInfo(id));
      return response.UserFindOne;
    } catch (error) {
      console.error(error);
    }
  }
);
