import style from './WorkCard.module.scss';
import { NavLink } from 'react-router-dom';
import { usePopup } from '../../hooks/usePopup';
import { WorkCardPopup } from '../WorkCardPopup/WorkCardPopup';
import { Preview } from '../Preview/Preview';

export const WorkCard = ({ work }) => {
  const { isPopupVisible, toggle, ref: menuRef } = usePopup();
  const [html, css, js] = work.files;

  const openMenu = (e) => {
    e.preventDefault();
    toggle();
  };

  if (work.title === null) return null;
  return (
    <NavLink className={style.card} to={`/your-works/${work._id}`}>
      <div style={{ pointerEvents: 'none' }} className={style.preview}>
        <Preview
          html={html.text}
          css={`
            html {
              zoom: 0.3;
            }
            ${css.text}
          `}
          js={js.text}
        />
      </div>

      <div className={style.info}>
        <span className={style.title}>{work.title}</span>
        <span className={style.desc}>{work.description}</span>
      </div>

      <div onClick={openMenu} className={style.menu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <WorkCardPopup menuRef={menuRef} isVisible={isPopupVisible} work={work} />
    </NavLink>
  );
};
