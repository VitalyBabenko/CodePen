import style from './LoadingPage.module.scss';

export const LoadingPage = () => {
  return (
    <div className={style.loadingPage}>
      <div className={style.spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
