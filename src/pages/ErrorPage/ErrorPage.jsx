import style from './ErrorPage.module.scss';
import { NavLink } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <div className={style.errorPage}>
      <div className={style.container}>
        <h1>404</h1>
        <p>
          I'm afraid you've found a page that doesn't exist on CodePen. That can happen when you
          follow a link to something that has since been deleted. Or the link was incorrect to begin
          with.<p>Sorry about that. We've logged the error for review, in case it's our fault.</p>
        </p>
        <NavLink to="/">Go to the homepage!</NavLink>
      </div>
    </div>
  );
};
