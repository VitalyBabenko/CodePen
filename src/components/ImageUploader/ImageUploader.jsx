import { useSelector } from 'react-redux';
import { appIcons } from '../../assets/img';
import { usePopup } from '../../hooks';
import { DragAndDropPopup } from '../DragAndDropPopup/DragAndDropPopup';
import style from './ImageUploader.module.scss';

export const ImageUploader = () => {
  const dndPopup = usePopup();
  const { avatar } = useSelector(state => state.user);
  const { UploadFileIcon } = appIcons;

  return (
    <>
      <div className={style.imageUploader}>
        <img src={avatar} alt="userImage" />
        <div className={style.info}>
          <span>Upload a New Profile Image</span>
          <button onClick={dndPopup.open}>
            <UploadFileIcon />
            Choose File
          </button>
          <span>or drag and drop an image here</span>
          <span>Ideal dimensions are 500px x 500px.</span>
          <span>Maximum file size is 5mb.</span>
        </div>
      </div>

      <DragAndDropPopup isOpen={dndPopup.isOpen} close={dndPopup.close} />
    </>
  );
};
