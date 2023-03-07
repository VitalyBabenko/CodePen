import style from "./WorkCard.module.scss";
import { NavLink } from "react-router-dom";
import usePopup from "../../../hooks/usePopup";

export const WorkCard = ({ work }) => {
  const { isPopupVisible, toggle, ref: menuRef } = usePopup();

  const openMenu = (e) => {
    e.preventDefault();
    toggle();
  };
  // TODO: rename && changeDesc && delete
  const renameWork = (e) => {
    e.preventDefault();
    console.log("renameWork");
  };

  const changeDescription = (e) => {
    e.preventDefault();
    console.log("changeDescription");
  };

  const deleteWork = (e) => {
    e.preventDefault();
    console.log("work");
  };

  return (
    <NavLink className={style.card} to={`/you-work/${work._id}`}>
      <div className={style.preview}></div>

      <div className={style.info}>
        <span className={style.title}>{work.title}</span>
        <span className={style.desc}>{work.description}</span>
      </div>

      <div onClick={openMenu} className={style.menu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {isPopupVisible && (
        <ul ref={menuRef} className={style.menuPopup}>
          <li onClick={renameWork}>Rename work</li>
          <li onClick={changeDescription}>Change Description</li>
          <li className={style.delete} onClick={deleteWork}>
            Delete work
          </li>
        </ul>
      )}
    </NavLink>
  );
};
