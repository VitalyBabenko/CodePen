import style from "./Footer.module.scss";
import { ReactComponent as LogoSmall } from "../../../assets/img/logo.svg";

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.main}>
        <LogoSmall className={style.logoSmall} />
        <p>©2023 CodePen</p>
      </div>
    </footer>
  );
};
