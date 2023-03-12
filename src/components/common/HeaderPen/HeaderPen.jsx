import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Logo } from "../../../assets/img/logo.svg";
import { NavLink } from "react-router-dom";
import style from "./HeaderPen.module.scss";

export const HeaderPen = () => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.auth);

  const logout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
  };

  return (
    <header className={style.header}>
      <div className={style.logoBlock}>
        <NavLink to="/">
          <Logo />
        </NavLink>
        <div className={style.workInfo}>
          <h1>Title</h1>
          <span>Captain Anonymous</span>
        </div>
      </div>

      <nav>
        <button>Save</button>

        {isLogged ? (
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
