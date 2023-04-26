import style from './ConsoleItem.module.scss';

export const ConsoleItem = ({ message }) => {
  return <pre className={style.consoleItem}>{message}</pre>;
};
