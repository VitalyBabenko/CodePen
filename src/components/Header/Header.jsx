import { NavLink } from 'react-router-dom';
import style from './Header.module.scss';
import { ReactComponent as LogoBig } from '../../assets/img/logoBig.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/user/actions/fetchUser';
import { useEffect } from 'react';
import { getUserIdFromJwt } from '../../utils/getUserIdFromJwt';
import { usePopup } from '../../hooks/usePopup';
import { UserPopup } from '../UserPopup/UserPopup';

export const Header = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const { avatar } = useSelector((state) => state.user);
  const userPopup = usePopup();

  useEffect(() => {
    if (isAuth) {
      const userId = getUserIdFromJwt(localStorage.authToken);
      dispatch(fetchUser(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className={style.header}>
      <NavLink className={style.logoBlock} to="/">
        <LogoBig />
      </NavLink>

      {isAuth ? (
        <nav>
          <img src={avatar} onClick={userPopup.open} alt="userImage" />
          <UserPopup
            popupRef={userPopup.ref}
            isOpen={userPopup.isPopupVisible}
          />
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
