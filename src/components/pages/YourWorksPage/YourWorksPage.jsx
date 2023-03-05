import { Header } from '../../common/Header/Header';
import style from './YourWorksPage.module.scss';
import { ReactComponent as LogoBig } from '../../../assets/img/logoBig.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserIdFromJwt } from '../../../utils/getUserIdFromJwt';

import { WorkCard } from '../../common/WorkCard/WorkCard';

export const YourWorks = () => {
  const { works, isLoading } = useSelector((state) => state.user);

  if (isLoading) return <p>loading...</p>;
  return (
    <div className={style.YourWorks}>
      <Header />
      <div className={style.container}>
        <div className={style.worksTab}>
          <a className={style.active} href="/your-works">
            Your Works
          </a>
        </div>
      </div>

      {works && works.map((work) => <WorkCard key={work._id} />)}

      <footer className={style.footer}>
        <div className={style.main}>
          <LogoBig className={style.logoBig} />
          <p>©2023 CodePen</p>
        </div>
      </footer>
    </div>
  );
};
