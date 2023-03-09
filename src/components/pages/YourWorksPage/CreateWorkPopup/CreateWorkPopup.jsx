import { useDispatch } from "react-redux";
import useInput from "../../../../hooks/useInput";
import { createWork } from "../../../../store/user/actions/createWorkAction";
import { Input } from "../../../common/Input/Input";
import style from "./CreateWorkPopup.module.scss";

export const CreateWorkPopup = ({ popupRef, close }) => {
  const dispatch = useDispatch();
  const title = useInput("");
  const description = useInput("");

  const handleCreateWork = (e) => {
    e.preventDefault();
    dispatch(
      createWork({ title: title.value, description: description.value })
    );
  };

  return (
    <div ref={popupRef} className={style.CreateWorkPopup}>
      <header className={style.header}>
        <span>Create Work</span>
        <button onClick={close}>✕</button>
      </header>
      <form onSubmit={handleCreateWork} className={style.container}>
        <Input title={"Title"} value={title.value} onChange={title.onChange} />
        <Input
          value={description.value}
          onChange={description.onChange}
          title={"Description"}
        />
        <button type={"submit"} className={style.save}>
          Create
        </button>
      </form>
    </div>
  );
};