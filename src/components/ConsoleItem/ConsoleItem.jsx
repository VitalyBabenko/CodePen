import style from './ConsoleItem.module.scss';

const ConsoleItem = ({ message }) => {
  return <pre className={style.consoleItem}>{message}</pre>;
};

export default ConsoleItem;
