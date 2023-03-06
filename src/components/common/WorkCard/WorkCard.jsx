import style from "./WorkCard.module.scss";
import { ReactComponent as MenuSmall } from "../../../assets/img/menuSmall.svg";
import { NavLink } from "react-router-dom";

export const WorkCard = ({ work }) => {
  return (
    // <div className={style.card}>
    //   <div className={style.external}>
    //     <img
    //       className={style.img}
    //       src="https://upmostly.com/wp-content/uploads/react-hello-world-first-react-app.jpg"
    //       alt="Hello World"
    //       style={{ width: '100%' }}
    //     />
    //     <div className={style.footerCard}>
    //       <h2>
    //         <b>A Pen By</b>
    //       </h2>
    //       <MenuSmall className={style.menuSmall} />
    //     </div>
    //   </div>
    // </div>
    <NavLink className={style.card} to={`/you-work/${work._id}`}>
      <div className={style.preview}></div>
      <div className={style.footerCard}>
        <h2>
          <b>A Pen By</b>
        </h2>
        <MenuSmall className={style.menuSmall} />
      </div>
    </NavLink>
  );
};
