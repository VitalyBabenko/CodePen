import style from './HomeCard.module.scss';

export const HomeCard = ({ icon: Icon, title, description }) => {
  return (
    <div className={style.card}>
      <Icon />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
