import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Logo } from '../../../assets/img/logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { saveFiles } from '../../../store/currentWork/actions/saveFiles';
import style from './HeaderPen.module.scss';
import { setFormatCode } from '../../../store/currentWork/currentWorkSlice';
import { askToLogin } from '../../../utils/askToLogin';

export const HeaderPen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);
  const { id, title, owner, files } = useSelector((state) => state.currentWork);

  const logout = () => {
    localStorage.removeItem('authToken');
    dispatch(logout());
  };

  const handleSaveFiles = () => {
    dispatch(setFormatCode());

    if (!isAuth) {
      if (askToLogin()) navigate('/login');
    } else {
      dispatch(
        saveFiles({
          id,
          html: files.html.text,
          css: files.css.text,
          js: files.js.text,
        })
      );
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

      <nav>
        <button onClick={handleSaveFiles}>Save</button>

        {isAuth ? (
          <>
            <NavLink to="/your-works">Your works</NavLink>
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
