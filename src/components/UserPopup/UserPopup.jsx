import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { appIcons } from '../../assets/img';
import { logout } from '../../store/auth/authSlice';
import style from './UserPopup.module.scss';

export const UserPopup = ({ isOpen, popupRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { PenIcon, SettingIcon, LogoutIcon } = appIcons;

  const handleLogout = () => {
    localStorage.removeItem('authToken');

    navigate('/');
    dispatch(logout());
  };

  if (!isOpen) return null;
  return (
    <ul ref={popupRef} className={style.userPopup}>
      <li onClick={() => navigate('/your-works')}>
        <PenIcon className={style.pen} /> Your Works
      </li>

      <hr />

      <li onClick={() => navigate('/settings')}>
        <SettingIcon /> Settings
      </li>

      <li onClick={handleLogout}>
        <LogoutIcon /> Log Out
      </li>
    </ul>
  );
};
