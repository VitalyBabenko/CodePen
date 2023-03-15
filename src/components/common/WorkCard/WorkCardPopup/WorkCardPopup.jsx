import { useDispatch } from "react-redux";
import { deleteWork } from "../../../../store/works/actions/deleteWork";
import { updateWorkInfo } from "../../../../store/works/actions/updateWorkInfo";
import style from "./WorkCardPopup.module.scss";

export const WorkCardPopup = ({ menuRef, isVisible, work }) => {
  const dispatch = useDispatch();

  const renameWork = (e) => {
    e.preventDefault();

    const newTitle = prompt(`rename work: ${work.title}`, work.title);
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

  const changeDescription = (e) => {
    e.preventDefault();

    const newDescription = prompt(
      `change description: ${work.title}`,
      work.description
    );
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

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteWork(work._id));
  };

  if (isVisible)
    return (
      <ul ref={menuRef} className={style.menuPopup}>
        <li onClick={renameWork}>Rename work</li>
        <li onClick={changeDescription}>Change Description</li>
        <li className={style.delete} onClick={handleDelete}>
          Delete work
        </li>
      </ul>
    );
  return null;
};
