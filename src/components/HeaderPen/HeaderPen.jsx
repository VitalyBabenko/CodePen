import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import { NavLink } from 'react-router-dom';
import { saveFiles } from '../../store/currentWork/actions/saveFiles';
import style from './HeaderPen.module.scss';
import { setFormatCode } from '../../store/currentWork/currentWorkSlice';
import { BsFillCloudFill } from 'react-icons/bs';
import { FaPen } from 'react-icons/fa/index';
import { GoMessage } from '../GoMessage/GoMessage';

export const HeaderPen = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const { id, title, owner, files } = useSelector((state) => state.currentWork);

  const logout = () => {
    localStorage.removeItem('authToken');
    dispatch(logout());
  };

  // const loginPrompt = (
  //   <div className={style.loginPopup}>
  //     <span>
  //       You’ll have to Log In or Sign Up to save your Pen. Don’t worry! All your
  //       work will be saved to your account.
  //     </span>
  //     <div>
  //       <button>close</button>
  //       <NavLink to={'/login'}>OK</NavLink>
  //     </div>
  //   </div>
  // );

  // TODO: HoldUp component

  const handleSaveFiles = () => {
    dispatch(setFormatCode());

    if (!isAuth) {
      console.log('HoldUp component!!!!');
    } else {
      dispatch(
        saveFiles({
          id,
          html: files.html.text,
          css: files.css.text,
          js: files.js.text,
        })
      );
    }
  };

  return (
    <header className={style.header}>
      <div className={style.logoBlock}>
        <NavLink to="/">
          <Logo />
        </NavLink>
        <div className={style.workInfo}>
          <h1>{title}</h1>
          <span>{owner?.login}</span>
        </div>
      </div>

      <GoMessage />

      <nav>
        <button onClick={handleSaveFiles}>
          <BsFillCloudFill />
          Save
        </button>

        {isAuth ? (
          <>
            <NavLink to="/your-works">
              <FaPen /> Your works
            </NavLink>
            <NavLink
              style={{ backgroundColor: '#dc143c' }}
              onClick={logout}
              to="/"
            >
              Log out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/signup">Sign up</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};
