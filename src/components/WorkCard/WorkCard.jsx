import { NavLink } from 'react-router-dom';
import { usePopup } from '../../hooks';
import { Preview } from '../Preview/Preview';
import { WorkCardPopup } from '../WorkCardPopup/WorkCardPopup';
import style from './WorkCard.module.scss';

export const WorkCard = ({ work }) => {
  const menuPopup = usePopup();
  const [html, css, js] = work.files;

  console.log(work);

  return (
    <div className={style.card}>
      <NavLink to={`/your-works/${work._id}`} className={style.previewContainer}>
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
      </NavLink>

      <div className={style.info}>
        <span className={style.title}>{work.title}</span>
        <span className={style.desc}>{work.description}</span>
      </div>

      <div onClick={menuPopup.toggle} className={style.menu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <WorkCardPopup
        menuRef={menuPopup.ref}
        closePopup={menuPopup.close}
        isVisible={menuPopup.isOpen}
        work={work}
      />
      <div className={style.background}></div>
    </div>
  );
};
