import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/auth/authSlice';
import { IoMdSettings } from 'react-icons/io/index';
import { MdLogout } from 'react-icons/md/index';
import { FaPen } from 'react-icons/fa/index';

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
      <li onClick={() => navigate('/your-works')}>
        <FaPen className={style.pen} /> Your Works
      </li>
      <hr />
      <li onClick={() => navigate('/settings')}>
        <IoMdSettings /> Settings
      </li>
      <li onClick={handleLogout}>
        <MdLogout /> Log Out
      </li>
    </ul>
  );
};
