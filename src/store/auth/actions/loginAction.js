import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGql } from "../../../services/api";
import { queries } from "../../../services/queries";

export const login = createAsyncThunk(
  "auth/login",

  async ({ login, password }) => {
    const gql = getGql();
    try {
      const response = await gql.request(queries.login, { login, password });
      if (response.login) {
        localStorage.setItem("authToken", response.login);
      }
      return response.login;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);
