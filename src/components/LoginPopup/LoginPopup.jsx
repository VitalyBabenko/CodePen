import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import { login } from '../../store/auth/actions/loginAction';
import { Input } from '../Input/Input';
import style from '../LoginPopup/LoginPopup.module.scss';

export const LoginPopup = ({ isOpen, close }) => {
  const navigate = useNavigate();
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

    dispatch(login(userData));
  };

  useEffect(() => {
    if (isAuth) navigate('/your-works');
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
        <div className={style.tableOfContents}>
          <h1>Hold up!</h1>
          <span>
            You’ll have to <strong>Log In</strong> or <strong>Sign Up</strong>{' '}
            (for free!) to save your Pen. <br /> Don’t worry! All your work will
            be saved to your account.
          </span>
        </div>
        <form onSubmit={handleLogin}>
          <Input
            title="Username or Email"
            value={loginName.value}
            onChange={loginName.onChange}
          />
          <Input
            title="Password"
            type="password"
            value={password.value}
            onChange={password.onChange}
          />
          <button type="submit">Log In</button>
        </form>

        <div className={style.create}>
          <span>Need to create an account?</span>
          <Link to="/signup"> Sign Up for CodePen</Link>
        </div>
      </div>
    </>
  );
};
