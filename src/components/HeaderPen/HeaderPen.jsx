import { BsFillCloudFill } from 'react-icons/bs';
import { FaPen } from 'react-icons/fa/index';
import { MdLogout } from 'react-icons/md/index';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { appIcons } from '../../assets/img';
import { usePopup } from '../../hooks';
import { openLoginPopup } from '../../store/auth/authSlice';
import { saveFiles } from '../../store/currentWork/actions/saveFiles';
import { setFormatCode } from '../../store/currentWork/currentWorkSlice';
import { GoMessage } from '../GoMessage/GoMessage';
import { LoginPopup } from '../LoginPopup/LoginPopup';
import style from './HeaderPen.module.scss';

export const HeaderPen = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);
  const { id, title, owner, files } = useSelector(state => state.currentWork);
  const loginPopup = usePopup();
  const { AppIcon } = appIcons;

  const logout = () => {
    localStorage.removeItem('authToken');
    dispatch(logout());
  };

  const handleSaveFiles = () => {
    dispatch(setFormatCode());

    if (!isAuth) return dispatch(openLoginPopup());

    dispatch(
      saveFiles({
        id,
        html: files.html.text,
        css: files.css.text,
        js: files.js.text,
      })
    );
  };

  return (
    <header className={style.header}>
      <div className={style.logoBlock}>
        <NavLink to="/">
          <AppIcon />
        </NavLink>
        <div className={style.workInfo}>
          <h1>{title}</h1>
          <span>{owner?.login}</span>
        </div>
      </div>

      <GoMessage />

      <LoginPopup isOpen={loginPopup.isOpen} close={loginPopup.close} />

      <nav>
        <button onClick={handleSaveFiles}>
          <BsFillCloudFill />
          Save
        </button>

        {isAuth ? (
          <>
            <NavLink to="/your-works">
              <FaPen /> Your works
            </NavLink>
            <NavLink onClick={logout} to="/">
              <MdLogout />
              Log out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/signup">Sign up</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};
