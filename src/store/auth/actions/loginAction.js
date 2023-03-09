import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGql } from "../../../services/api";
import { queries } from "../../../services/queries";
import { getUserIdFromJwt } from "../../../utils/getUserIdFromJwt";
import { getWorks } from "../../user/actions/getWorksAction";

export const login = createAsyncThunk(
  "auth/login",

  async ({ login, password }, { dispatch }) => {
    const gql = getGql();
    try {
      const response = await gql.request(queries.login, { login, password });
      if (response.login) {
        localStorage.setItem("authToken", response.login);
      }

      const userId = getUserIdFromJwt(localStorage.authToken);
      dispatch(getWorks(userId));

      return response.login;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);
