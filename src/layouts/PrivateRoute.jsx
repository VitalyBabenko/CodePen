import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
