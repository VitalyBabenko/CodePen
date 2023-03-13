import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Logo } from "../../../assets/img/logo.svg";
import { NavLink } from "react-router-dom";
import style from "./HeaderPen.module.scss";

export const HeaderPen = ({ onSave, workTitle, workOwner }) => {
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
          <h1>{workTitle}</h1>
          <span>{workOwner}</span>
        </div>
      </div>

      <nav>
        <button onClick={() => onSave()}>Save</button>

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
