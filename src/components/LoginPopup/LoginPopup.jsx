import { useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import { login } from '../../store/auth/actions/loginAction';
import { Input } from '../Input/Input';
import style from '../LoginPopup/LoginPopup.module.scss';

export const LoginPopup = ({ isOpen, close }) => {
  const dispatch = useDispatch();
  const { isAuth, error } = useSelector((state) => state.auth);
  const loginName = useInput('');
  const password = useInput('');

  const handleLogin = (e) => {
    e.preventDefault();

    const userData = {
      login: loginName.value,
      password: password.value,
    };

    console.log(dispatch(login(userData)));
  };

  useEffect(() => {
    if (isAuth) close();
    if (error) {
      loginName.setValue('');
      password.setValue('');
    }
  }, [isAuth, error]);

  if (!isOpen) return null;
  return (
    <>
      <div className={style.overlay} onClick={close} />
      <div className={style.loginPopup}>
        <GrClose className={style.close} onClick={close} />
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
