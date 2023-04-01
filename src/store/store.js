import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { authSlice } from './auth/authSlice';
import { worksSlice } from './works/worksSlice';
import { currentWorkSlice } from './currentWork/currentWorkSlice';
import { userSlice } from './user/userSlice';
import { goMessageSlice } from './goMessage/goMessageSlice';

const loggerMiddleware = createLogger();

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    works: worksSlice.reducer,
    goMessage: goMessageSlice.reducer,
    currentWork: currentWorkSlice.reducer,

    middleware: [thunkMiddleware, loggerMiddleware],
  },
});
