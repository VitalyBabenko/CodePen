import { useSelector } from "react-redux";
import { WorkCard } from "../WorkCard/WorkCard";
import style from "./Works.module.scss";

export const Works = ({ openPopup }) => {
  const { works } = useSelector((state) => state.works);

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
