import React from 'react';
import style from './PopupWrapper.module.scss';

export const PopupWrapper = ({ title, children, close, className, isOpen }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className={style.overlay} onClick={close}></div>
      <div className={style.popupWrapper}>
        <header>
          <h2>{title}</h2>
          <button onClick={close}>✕</button>
        </header>

        <div className={className}>{children}</div>
      </div>
    </>
  );
};
