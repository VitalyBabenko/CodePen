import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import { authSlice } from "./auth/authSlice";
import { userSlice } from "./user/userSlice";

const loggerMiddleware = createLogger();

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,

    middleware: [thunkMiddleware, loggerMiddleware],
  },
});
