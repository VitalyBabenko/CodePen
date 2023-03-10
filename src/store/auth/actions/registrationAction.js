import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGql } from "../../../services/api";
import { queries } from "../../../services/queries";
import { login } from "./loginAction";

export const registration = createAsyncThunk(
  "auth/registration",

  async ({ userName, password }, { dispatch }) => {
    const gql = getGql();

    try {
      const { createUser } = await gql.request(queries.createUser, {
        login: userName,
        password,
      });

      if (createUser !== null) {
        dispatch(
          login({
            login: userName,
            password,
          })
        );
      }

      return createUser;
    } catch (error) {
      console.error(error);
    }
  }
);
