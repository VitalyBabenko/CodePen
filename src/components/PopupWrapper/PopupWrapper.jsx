import { appIcons } from '../../assets/img';
import { Portal } from '../Portal/Portal';
import style from './PopupWrapper.module.scss';

export const PopupWrapper = ({ title, children, close, className, isOpen }) => {
  const { CloseIcon } = appIcons;
  if (!isOpen) return null;
  return (
    <Portal selector="#popups">
      <div className={style.overlay} onClick={close} tabIndex={0}></div>
      <div className={style.popupWrapper}>
        <header>
          <h2>{title}</h2>
          <button onClick={close}>
            <CloseIcon />
          </button>
        </header>

        <div className={className}>{children}</div>
      </div>
    </Portal>
  );
};
