import style from './YourWorksPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserIdFromJwt } from '../../utils/getUserIdFromJwt';
import { usePopup } from '../../hooks/usePopup';
import { LoadingPage } from '../LoadingPage/LoadingPage';
import { fetchWorks } from '../../store/works/actions/fetchWorks';
import { Works } from '../../components/Works/Works';
import { MainLayout } from '../../layouts/MainLayout';
import { PopupWrapper } from '../../components/PopupWrapper/PopupWrapper';
import { Input } from '../../components/Input/Input';

export const YourWorksPage = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.works);
  const { isPopupVisible, ref, open, close } = usePopup();
  const newPenPopup = usePopup();

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
          <button onClick={newPenPopup.open}>+</button>
        </div>

        <Works openPopup={newPenPopup.open} />
      </div>

      <PopupWrapper
        title="New Pen!"
        className={style.newPen}
        isOpen={newPenPopup.isPopupVisible}
        close={newPenPopup.close}
      >
        <form>
          <Input title="Pen title" />
          <Input title="Pen description" />
          <button>Create</button>
        </form>
      </PopupWrapper>
    </MainLayout>
  );
};
