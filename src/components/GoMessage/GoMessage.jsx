import style from './GoMessage.module.scss';
import { GrClose } from 'react-icons/gr';
import { BsCheckLg } from 'react-icons/bs';

export const GoMessage = ({ children, type, message, isOpen, close }) => {
  const getStyle = () => {
    let top = isOpen ? '20px' : '-200px';
    let border;

    if (type === 'success') {
      border = '2px solid #46CF73';
    }
    if (type === 'warning') {
      border = '2px solid #ffdd40';
    }

    return {
      top,
      border,
    };
  };

  if (children) {
    return (
      <div style={getStyle()} className={style.message}>
        {children}
      </div>
    );
  }

  return (
    <div style={getStyle()} className={style.message}>
      <BsCheckLg />
      <span>{message}</span>
      <GrClose onClick={close} />
    </div>
  );
};
