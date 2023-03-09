import { useDispatch } from "react-redux";
import { deleteWork } from "../../../../store/user/actions/deleteWorkAction";
import style from "./WorkCardPopup.module.scss";

export const WorkCardPopup = ({ menuRef, isVisible, work }) => {
  const dispatch = useDispatch();

  // TODO: rename && changeDesc && delete
  const renameWork = (e) => {
    e.preventDefault();
    console.log("renameWork");
  };

  const changeDescription = (e) => {
    e.preventDefault();
    console.log("changeDescription");
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("work");
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