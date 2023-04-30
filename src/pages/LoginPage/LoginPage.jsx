import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { appImages } from '../../assets/img';
import { Input } from '../../components/Input/Input';
import { useInput } from '../../hooks';
import { login } from '../../store/auth/actions/loginAction';
import { LoadingPage } from '../LoadingPage/LoadingPage';
import style from './LoginPage.module.scss';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, loading, error } = useSelector(state => state.auth);
  const loginName = useInput();
  const password = useInput();
  const { CodepenLogo } = appImages;

  const handleFormSubmit = e => {
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

  if (loading) return <LoadingPage />;
  return (
    <form onSubmit={handleFormSubmit} className={style.container}>
      <NavLink to="/">
        <CodepenLogo className={style.logoBig} />
      </NavLink>

      <h1>Log In!</h1>

      {error && <span>{error}</span>}

      <Input title={'Login'} value={loginName.value} onChange={loginName.onChange} />

      <Input
        type={'password'}
        title={'Password'}
        value={password.value}
        onChange={password.onChange}
      />

      <button type="submit" className={style.login}>
        Log In
      </button>

      <p>
        Need an account? <NavLink to="/signup">Sign up now!</NavLink>
      </p>
    </form>
  );
};
