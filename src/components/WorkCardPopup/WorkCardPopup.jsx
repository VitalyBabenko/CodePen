import { useDispatch } from 'react-redux';
import { appIcons } from '../../assets/img';
import { useInput, usePopup } from '../../hooks';
import { deleteWork } from '../../store/works/actions/deleteWork';
import { updateWorkInfo } from '../../store/works/actions/updateWorkInfo';
import { Input } from '../Input/Input';
import { PopupWrapper } from '../PopupWrapper/PopupWrapper';
import style from './WorkCardPopup.module.scss';

export const WorkCardPopup = ({ menuRef, isVisible, work }) => {
  const dispatch = useDispatch();
  const optionsPopup = usePopup();
  const renameInput = useInput(`${work.title}`);
  const { TrashIcon, DescriptionIcon, RenameIcon } = appIcons;

  const renameWork = () => {
    console.log(renameInput.value);

    const newTitle = renameInput.value;
    if (newTitle) {
      const updatedWorkInfo = {
        id: work._id,
        title: newTitle,
        description: work.description,
        files: work.files,
      };

      dispatch(updateWorkInfo(updatedWorkInfo));
    }
  };

  const changeDescription = e => {
    const newDescription = prompt(`change description: ${work.title}`, work.description);
    if (newDescription) {
      const updatedWorkInfo = {
        id: work._id,
        title: work.title,
        description: newDescription,
        files: work.files,
      };

      dispatch(updateWorkInfo(updatedWorkInfo));
    }
  };

  const handleDelete = e => {
    e.preventDefault();
    dispatch(deleteWork(work._id));
  };

  return (
    <>
      <ul ref={menuRef} className={isVisible ? style.menuPopup : style.hidden}>
        <li onClick={() => optionsPopup.open()}>
          <RenameIcon className={style.rename} /> Rename work
        </li>

        <li onClick={optionsPopup.open}>
          <DescriptionIcon className={style.changeDesc} />
          Change Description
        </li>

        <li className={style.delete} onClick={handleDelete}>
          <TrashIcon />
          Delete work
        </li>
      </ul>

      <PopupWrapper
        className={style.popup}
        title={'Rename work'}
        isOpen={optionsPopup.isOpen}
        close={optionsPopup.close}
      >
        <form onSubmit={e => renameWork(e)}>
          <Input
            value={renameInput.value}
            onChange={renameInput.onChange}
            title="New title"
          />
          <button onClick={renameWork} type="submit">
            Change
          </button>
        </form>
      </PopupWrapper>
    </>
  );
};
