import style from './ImageUploader.module.scss';
import { usePopup } from '../../hooks/usePopup';
import { DragAndDropPopup } from '../DragAndDropPopup/DragAndDropPopup';
import { useSelector } from 'react-redux';
import { MdUploadFile } from 'react-icons/md';

export const ImageUploader = () => {
  const dndPopup = usePopup();
  const { avatar } = useSelector((state) => state.user);

  return (
    <>
      <div className={style.imageUploader}>
        <img src={avatar} alt="userImage" />
        <div className={style.info}>
          <span>Upload a New Profile Image</span>
          <button onClick={dndPopup.open}>
            <MdUploadFile />
            Choose File
          </button>
          <span>or drag and drop an image here</span>
          <span>Ideal dimensions are 500px x 500px.</span>
          <span>Maximum file size is 5mb.</span>
        </div>
      </div>

      <DragAndDropPopup
        isOpen={dndPopup.isPopupVisible}
        close={dndPopup.close}
      />
    </>
  );
};
