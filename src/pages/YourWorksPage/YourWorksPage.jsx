import style from './YourWorksPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserIdFromJwt } from '../../utils/getUserIdFromJwt';
import { usePopup } from '../../hooks/usePopup';
import { fetchWorks } from '../../store/works/actions/fetchWorks';
import { Works } from '../../components/Works/Works';
import { MainLayout } from '../../layouts/MainLayout';
import { PopupWrapper } from '../../components/PopupWrapper/PopupWrapper';
import { Input } from '../../components/Input/Input';
import { useInput } from '../../hooks/useInput';
import { createWork } from '../../store/works/actions/createWork';

export const YourWorksPage = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const newPenPopup = usePopup();
  const title = useInput();
  const description = useInput();

  useEffect(() => {
    if (isAuth) {
      const userId = getUserIdFromJwt(localStorage.authToken);
      dispatch(fetchWorks(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    const newWork = {
      title: title.value,
      description: description.value,
    };
    dispatch(createWork(newWork));
    newPenPopup.close();
    title.setValue('');
    description.setValue('');
  };

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
        <form onSubmit={handleCreate}>
          <Input
            value={title.value}
            onChange={title.onChange}
            title="Pen title"
          />
          <Input
            value={description.value}
            onChange={description.onChange}
            title="Pen description"
          />
          <button type="submit">Create</button>
        </form>
      </PopupWrapper>
    </MainLayout>
  );
};
