import { NavLink, useLocation } from "react-router-dom";
import style from "./Header.module.scss";
import { ReactComponent as LogoBig } from "../../../assets/img/logoBig.svg";
import { useDispatch, useSelector } from "react-redux";

export const Header = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  const logout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
  };

  return (
    <header className={style.header}>
      <NavLink className={style.logoBlock} to="/">
        <LogoBig />
      </NavLink>

      {isAuth ? (
        <nav>
          <NavLink to="/your-works">Your works</NavLink>
          <NavLink
            style={{ backgroundColor: "#dc143c" }}
            onClick={logout}
            to="/"
          >
            Log out
          </NavLink>
        </nav>
      ) : (
        <nav>
          <NavLink to="/login">Log in</NavLink>
          <NavLink to="/signup">Sign up</NavLink>
        </nav>
      )}
    </header>
  );
};
