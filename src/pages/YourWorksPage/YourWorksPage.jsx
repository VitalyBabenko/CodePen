import { Header } from '../../components/Header/Header';
import style from './YourWorksPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Footer } from '../../components/Footer/Footer';
import { useEffect } from 'react';
import { getUserIdFromJwt } from '../../utils/getUserIdFromJwt';
import { usePopup } from '../../hooks/usePopup';
import { CreateWorkPopup } from '../../components/CreateWorkPopup/CreateWorkPopup';
import { LoadingPage } from '../LoadingPage/LoadingPage';
import { fetchWorks } from '../../store/works/actions/fetchWorks';
import { Works } from '../../components/Works/Works';
import { MainLayout } from '../../layouts/MainLayout';

export const YourWorksPage = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.works);
  const { isPopupVisible, ref, open, close } = usePopup();

  useEffect(() => {
    if (isAuth) {
      const userId = getUserIdFromJwt(localStorage.authToken);
      dispatch(fetchWorks(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <LoadingPage />;
  return (
    <MainLayout className={style.yourWorks}>
      <div className={style.container}>
        <div className={style.worksTab}>
          <a className={style.active} href="/your-works">
            Your Works
          </a>
          <button onClick={open}>+</button>
        </div>

        <Works openPopup={open} />
      </div>

      {isPopupVisible && <CreateWorkPopup popupRef={ref} close={close} />}
    </MainLayout>
  );
};
