import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useNavigate } from 'react-router-dom';
import { SettingsPage } from '../pages/SettingsPage/SettingsPage';

export const PrivateRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      return navigate('/login');
    }
  }, []);

  return children;
};
