import { useSelector } from 'react-redux';
import { WorkCard } from '../WorkCard/WorkCard';
import style from './Works.module.scss';
import { Spinner } from '../Spinner/Spinner';

export const Works = ({ openPopup }) => {
  const { works, isLoading } = useSelector((state) => state.works);

  if (isLoading) {
    return (
      <div className={style.loader}>
        <Spinner />
      </div>
    );
  }

  if (!works.length) {
    return (
      <div className={style.empty}>
        <h3>You haven't created any Pens yet.</h3>
        <button onClick={openPopup}>Go make one!</button>
      </div>
    );
  }

  return (
    <div className={style.works}>
      {works && works.map((work) => <WorkCard key={work._id} work={work} />)}
    </div>
  );
};
