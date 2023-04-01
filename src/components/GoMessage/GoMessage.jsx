import style from './GoMessage.module.scss';
import { GrClose } from 'react-icons/gr';
import { BsCheckLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from '../../store/goMessage/goMessageSlice';

export const GoMessage = () => {
  const dispatch = useDispatch();
  const { isShowing, message, color } = useSelector((state) => state.goMessage);

  if (isShowing) {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
  }

  const getStyle = () => {
    let top = isShowing ? '20px' : '-200px';
    let border = `2px solid ${color}`;

    return {
      top,
      border,
    };
  };

  return (
    <div style={getStyle()} className={style.message}>
      {color === '#46CF73' && <BsCheckLg className={style.greenCircle} />}
      {color === '#ff3b41' && <GrClose className={style.redCircle} />}
      <span>{message}</span>
      <GrClose
        className={style.close}
        onClick={() => dispatch(clearMessage())}
      />
    </div>
  );
};
