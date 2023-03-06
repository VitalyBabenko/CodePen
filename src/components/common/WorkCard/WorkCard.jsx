import style from "./WorkCard.module.scss";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export const WorkCard = ({ work }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const openMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(true);
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

      {isMenuOpen && (
        <ul ref={menuRef} className={style.menuPopup}>
          <li>Rename work</li>
          <li>Change Description</li>
          <li className={style.delete} onClick={deleteWork}>
            Delete work
          </li>
        </ul>
      )}
    </NavLink>
  );
};
