import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../components/Input/Input';
import { PopupWrapper } from '../../components/PopupWrapper/PopupWrapper';
import { Search } from '../../components/Search/Search';
import { Works } from '../../components/Works/Works';
import { useInput } from '../../hooks/useInput';
import { usePopup } from '../../hooks/usePopup';
import { MainLayout } from '../../layouts/MainLayout';
import { createWork } from '../../store/works/actions/createWork';
import { fetchWorks } from '../../store/works/actions/fetchWorks';
import { getUserIdFromJwt } from '../../utils/getUserIdFromJwt';
import style from './YourWorksPage.module.scss';

export const YourWorksPage = () => {
  const dispatch = useDispatch();
  const newPenPopup = usePopup();
  const title = useInput();
  const description = useInput();

  useEffect(() => {
    const ownerId = getUserIdFromJwt(localStorage.authToken);
    dispatch(fetchWorks({ ownerId }));
  }, []);

  const handleCreate = e => {
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

        <Search />

        <Works openPopup={newPenPopup.open} />
      </div>

      <PopupWrapper
        title="New Pen!"
        className={style.newPen}
        isOpen={newPenPopup.isPopupVisible}
        close={newPenPopup.close}
      >
        <form onSubmit={handleCreate}>
          <Input value={title.value} onChange={title.onChange} title="Pen title" />
          <Input value={description.value} onChange={description.onChange} title="Pen description" />
          <button type="submit">Create</button>
        </form>
      </PopupWrapper>
    </MainLayout>
  );
};
