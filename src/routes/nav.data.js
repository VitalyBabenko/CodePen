import { ErrorPage, HomePage, LoginPage, PenPage, SettingsPage, SignUpPage, YourWorksPage } from '../pages';

export const routes = [
  {
    path: '/',
    element: HomePage,
    isAuth: false,
  },
  {
    path: '/pen',
    element: PenPage,
    isAuth: false,
  },
  {
    path: '/login',
    element: LoginPage,
    isAuth: false,
  },
  {
    path: '/signup',
    element: SignUpPage,
    isAuth: false,
  },
  {
    path: '/settings',
    element: SettingsPage,
    isAuth: true,
  },
  {
    path: '/your-works',
    element: YourWorksPage,
    isAuth: true,
  },
  {
    path: '/your-works/:id',
    element: PenPage,
    isAuth: true,
  },
  {
    path: '*',
    element: ErrorPage,
    isAuth: true,
  },
];
