import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { saveFiles } from '../../store/currentWork/actions/saveFiles';
import style from './HeaderPen.module.scss';
import { setFormatCode } from '../../store/currentWork/currentWorkSlice';
import { askToLogin } from '../../utils/askToLogin';
import { BsFillCloudFill } from 'react-icons/bs';
import { FaPen } from 'react-icons/fa/index';
import { GoMessage } from '../GoMessage/GoMessage';
import { useTimedPopup } from '../../hooks/useTimedPopup';
import { usePopup } from '../../hooks/usePopup';

export const HeaderPen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);
  const { id, title, owner, files } = useSelector((state) => state.currentWork);
  const saveMessage = useTimedPopup();
  const askToLoginPopup = usePopup();

  const logout = () => {
    localStorage.removeItem('authToken');
    dispatch(logout());
  };

  const handleSaveFiles = () => {
    dispatch(setFormatCode());

    if (!isAuth) {
      askToLoginPopup.open();
      // if (askToLogin()) navigate('/login');
    } else {
      dispatch(
        saveFiles({
          id,
          html: files.html.text,
          css: files.css.text,
          js: files.js.text,
        })
      );
      saveMessage.openPopup();
    }
  };

  return (
    <header className={style.header}>
      <div className={style.logoBlock}>
        <NavLink to="/">
          <Logo />
        </NavLink>
        <div className={style.workInfo}>
          <h1>{title}</h1>
          <span>{owner?.login}</span>
        </div>
      </div>

      <GoMessage type="warning" isOpen={askToLoginPopup.isPopupVisible}>
        <div className={style.loginPopup}>
          <span>
            You’ll have to Log In or Sign Up to save your Pen. Don’t worry! All
            your work will be saved to your account.
          </span>
          <div>
            <button onClick={askToLoginPopup.close}>close</button>
            <NavLink to={'/login'}>OK</NavLink>
          </div>
        </div>
      </GoMessage>

      <GoMessage
        type="success"
        message={'Pen saved.'}
        close={saveMessage.closePopup}
        isOpen={saveMessage.isOpen}
      />

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
            <NavLink
              style={{ backgroundColor: '#dc143c' }}
              onClick={logout}
              to="/"
            >
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
