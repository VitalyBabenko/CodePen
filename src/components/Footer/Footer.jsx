import style from './Footer.module.scss';
import { ReactComponent as Logo } from '../../assets/img/logoBig.svg';

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <span>©2023 CodePen</span>
        <Logo />
      </div>
    </footer>
  );
};
