import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const PrivateRoute = ({ children, isPrivate }) => {
  const { isAuth } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPrivate) return;

    if (!isAuth) {
      return navigate('/login');
    }
  }, []);

  return children;
};
