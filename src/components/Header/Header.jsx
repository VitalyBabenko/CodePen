import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { appImages } from '../../assets/img';
import { usePopup } from '../../hooks';
import { fetchUser } from '../../store/user/actions/fetchUser';
import { getUserIdFromJwt } from '../../utils/getUserIdFromJwt';
import { UserPopup } from '../UserPopup/UserPopup';
import style from './Header.module.scss';

export const Header = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);
  const { avatar } = useSelector(state => state.user);
  const userPopup = usePopup();
  const { CodepenLogo } = appImages;

  useEffect(() => {
    if (isAuth) {
      const userId = getUserIdFromJwt(localStorage.authToken);
      dispatch(fetchUser(userId));
    }
  }, []);

  return (
    <header className={style.header}>
      <NavLink className={style.logoBlock} to="/">
        <CodepenLogo />
      </NavLink>

      {isAuth ? (
        <nav>
          <img src={avatar} onClick={userPopup.open} alt="userImage" />
          <UserPopup popupRef={userPopup.ref} isOpen={userPopup.isOpen} />
        </nav>
      ) : (
        <nav>
          <NavLink to="/login">Log in</NavLink>
          <NavLink to="/signup">Sign up</NavLink>
        </nav>
      )}
    </header>
  );
};
