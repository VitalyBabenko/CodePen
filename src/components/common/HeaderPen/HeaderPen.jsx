import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Logo } from "../../../assets/img/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { saveFiles } from "../../../store/currentWork/actions/saveFiles";
import style from "./HeaderPen.module.scss";

export const HeaderPen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);
  const { id, title, owner, files } = useSelector((state) => state.currentWork);

  const askToLogin = () => {
    const unAuthMessage = `You’ll have to Log In or Sign Up  to save your Pen.
    Don’t worry! All your work will be saved to your account.`;
    // eslint-disable-next-line no-restricted-globals
    if (confirm(unAuthMessage)) navigate("/login");
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
  };

  const handleSaveFiles = () => {
    if (isAuth) {
      dispatch(
        saveFiles({
          id,
          html: files.html.text,
          css: files.css.text,
          js: files.js.text,
        })
      );
    } else {
      askToLogin();
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
              style={{ backgroundColor: "#dc143c" }}
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
