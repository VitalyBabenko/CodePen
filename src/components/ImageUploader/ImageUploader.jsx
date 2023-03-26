import style from './ImageUploader.module.scss';
import initialUserImage from '../../assets/img/initialUserImage.jpeg';
import { usePopup } from '../../hooks/usePopup';
import { DragAndDropPopup } from '../DragAndDropPopup/DragAndDropPopup';

export const ImageUploader = () => {
  const uploader = usePopup();

  return (
    <>
      <div className={style.imageUploader}>
        <img src={initialUserImage} alt="userImage" />
        <div className={style.info}>
          <span>Upload a New Profile Image</span>
          <button onClick={uploader.open}>Choose File</button>
          <span>or drag and drop an image here</span>
          <span>Ideal dimensions are 500px x 500px.</span>
          <span>Maximum file size is 5mb.</span>
        </div>
      </div>
      {uploader.isPopupVisible && (
        <DragAndDropPopup
          isOpen={uploader.isPopupVisible}
          close={uploader.close}
        />
      )}
    </>
  );
};
