import { appIcons } from '../../assets/img';
import style from './Footer.module.scss';

export const Footer = () => {
  const { AppIcon } = appIcons;
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <span>©2023 CodePen</span>
        <AppIcon />
      </div>
    </footer>
  );
};
