import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { appIcons } from '../../assets/img';
import { Input } from '../../components/Input/Input';
import { Search } from '../../components/Search/Search';
import { Works } from '../../components/Works/Works';
import { useModal } from '../../hooks';
import { MainLayout } from '../../layouts/MainLayout';
import { showErrorMessage } from '../../store/goMessage/goMessageSlice';
import { createWork } from '../../store/works/actions/createWork';
import { fetchWorks } from '../../store/works/actions/fetchWorks';
import { getUserIdFromJwt } from '../../utils/getUserIdFromJwt';
import style from './YourWorksPage.module.scss';

export const YourWorksPage = () => {
  const dispatch = useDispatch();
  const [NewPenModal, openNewPen, closeNewPen] = useModal();
  const newTitleRef = useRef(null);
  const newDescriptionRef = useRef(null);
  const { CloseIcon } = appIcons;

  useEffect(() => {
    const ownerId = getUserIdFromJwt(localStorage.authToken);
    dispatch(fetchWorks({ ownerId }));
  }, []);

  const handleCreate = e => {
    e.preventDefault();

    if (!newTitleRef.current.value) {
      dispatch(showErrorMessage('The field is "Pen title" empty'));
      return;
    }

    const newWork = {
      title: newTitleRef.current.value,
      description: newDescriptionRef.current.value,
    };
    dispatch(createWork(newWork));
    closeNewPen();
  };

  return (
    <MainLayout className={style.yourWorks}>
      <div className={style.container}>
        <div className={style.worksTab}>
          <span className={style.active}>Your Works</span>
          <button onClick={openNewPen}>+</button>
        </div>

        <Search />

        <Works openNewPen={openNewPen} />
      </div>

      <NewPenModal className={style.newPen}>
        <header>
          <h1>New pen!</h1>
          <CloseIcon onClick={closeNewPen} />
        </header>
        <form onSubmit={handleCreate}>
          <Input inputRef={newTitleRef} title="Pen title" />
          <Input inputRef={newDescriptionRef} title="Pen description" />
          <button type="submit">Create</button>
        </form>
      </NewPenModal>
    </MainLayout>
  );
};
