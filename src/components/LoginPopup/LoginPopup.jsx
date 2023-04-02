import { useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeLoginPopup } from '../../store/auth/authSlice';
import style from '../LoginPopup/LoginPopup.module.scss';

export const LoginPopup = () => {
  const dispatch = useDispatch();
  const { isAuth, error, isLoginPopupOpen } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuth) dispatch(closeLoginPopup());
  }, [isAuth, error]);

  if (!isLoginPopupOpen) return null;
  return (
    <>
      <div
        className={style.overlay}
        onClick={() => dispatch(closeLoginPopup())}
      />
      <div className={style.loginPopup}>
        <GrClose
          className={style.close}
          onClick={() => dispatch(closeLoginPopup())}
        />
        <div className={style.tableOfContents}>
          <h1>Hold up!</h1>
          <span>
            You’ll have to <strong>Log In</strong> or <strong>Sign Up</strong>{' '}
            (for free!) to save your Pen. <br /> Don't worry! You can create and
            save new works in your account.
          </span>
          <div className={style.buttons}>
            <Link to="/login">Login</Link>
          </div>
        </div>

        <div className={style.create}>
          <span>Need to create an account?</span>
          <Link to="/signup"> Sign Up for CodePen</Link>
        </div>
      </div>
    </>
  );
};
