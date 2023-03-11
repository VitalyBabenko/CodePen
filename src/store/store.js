import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { authSlice } from "./auth/authSlice";
import { worksSlice } from "./works/worksSlice";
import { currentWorkSlice } from "./currentWork/currentWorkSlice";

const loggerMiddleware = createLogger();

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    works: worksSlice.reducer,
    currentWork: currentWorkSlice.reducer,

    middleware: [thunkMiddleware, loggerMiddleware],
  },
});
