import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { appIcons } from '../../assets/img';
import { useInput, useModal, usePopup } from '../../hooks';
import { showErrorMessage } from '../../store/goMessage/goMessageSlice';
import { deleteWork } from '../../store/works/actions/deleteWork';
import { updateWorkInfo } from '../../store/works/actions/updateWorkInfo';
import { Input } from '../Input/Input';
import style from './WorkCardPopup.module.scss';

export const WorkCardPopup = ({ menuRef, isVisible, closePopup, work }) => {
  const dispatch = useDispatch();
  const [RenameModal, openRename, closeRename] = useModal();
  const renameInputRef = useRef(null);

  const [ChangeDescModal, openChangeDesc, closeChangeDesc] = useModal();
  const changeDescInputRef = useRef(null);

  const { TrashIcon, DescriptionIcon, RenameIcon, CloseIcon } = appIcons;

  const renameWork = e => {
    e.preventDefault();
    if (!renameInputRef.current?.value) {
      dispatch(showErrorMessage('The field "New title" cannot be empty'));
      return;
    }

    const updatedWorkInfo = {
      id: work._id,
      title: renameInputRef.current?.value,
      description: work.description,
      files: work.files,
    };

    dispatch(updateWorkInfo(updatedWorkInfo));
    closeRename();
  };

  const changeDescription = e => {
    e.preventDefault();

    const updatedWorkInfo = {
      id: work._id,
      title: work.title,
      description: changeDescInputRef.current?.value,
      files: work.files,
    };

    dispatch(updateWorkInfo(updatedWorkInfo));
  };

  const handleDelete = e => {
    e.preventDefault();
    dispatch(deleteWork(work._id));
  };

  const handleOpenRename = () => {
    closePopup();
    openRename();
  };

  const handleOpenChangeDesc = () => {
    closePopup();
    openChangeDesc();
  };

  return (
    <>
      <ul ref={menuRef} className={isVisible ? style.menuPopup : style.hidden}>
        <li onClick={handleOpenRename}>
          <RenameIcon className={style.rename} /> Rename work
        </li>

        <li onClick={handleOpenChangeDesc}>
          <DescriptionIcon className={style.changeDesc} />
          Change Description
        </li>

        <li className={style.delete} onClick={handleDelete}>
          <TrashIcon />
          Delete work
        </li>
      </ul>

      <RenameModal className={style.optionsModal}>
        <header>
          <h1>Change title of {work.title}</h1>
          <CloseIcon onClick={closeRename} />
        </header>
        <form onSubmit={renameWork}>
          <Input inputRef={renameInputRef} title={'New title'} />
          <button>Change title</button>
        </form>
      </RenameModal>

      <ChangeDescModal className={style.optionsModal}>
        <header>
          <h1>Change description of {work.title}</h1>
          <CloseIcon onClick={closeChangeDesc} />
        </header>
        <form onSubmit={changeDescription}>
          <Input inputRef={changeDescInputRef} title={'New description'} />
          <button>Change description</button>
        </form>
      </ChangeDescModal>
    </>
  );
};
