import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/auth/authSlice';
import style from './UserPopup.module.scss';

export const UserPopup = ({ isOpen, popupRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');

    navigate('/');
    dispatch(logout());
  };

  if (!isOpen) return null;
  return (
    <ul ref={popupRef} className={style.userPopup}>
      <li onClick={() => navigate('/your-works')}>Your Works</li>
      <hr />
      <li onClick={() => navigate('/settings')}>Settings</li>
      <li onClick={handleLogout}>Log Out</li>
    </ul>
  );
};
