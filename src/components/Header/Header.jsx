import { NavLink } from "react-router-dom";
import style from "./Header.module.scss";
import { ReactComponent as LogoBig } from "../../assets/img/logoBig.svg";

export const Header = () => {
  return (
    <header className={style.header}>
      <NavLink className={style.logoBlock} to="/">
        <LogoBig />
      </NavLink>

      <nav>
        <NavLink to="/login">Log in</NavLink>
        <NavLink to="/signup">Sign up</NavLink>
      </nav>
    </header>
  );
};
