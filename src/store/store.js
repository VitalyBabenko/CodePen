import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { authSlice } from './auth/authSlice';
import { currentWorkSlice } from './currentWork/currentWorkSlice';
import { goMessageSlice } from './goMessage/goMessageSlice';
import { userSlice } from './user/userSlice';
import { worksSlice } from './works/worksSlice';

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
