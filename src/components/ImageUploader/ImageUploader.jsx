import { useState } from 'react';
import { useSelector } from 'react-redux';
import { appIcons } from '../../assets/img';
import { useModal } from '../../hooks';
import { CropperModal } from '../CropperModal/CropperModal';
import { DragAndDropModal } from '../DragAndDropModal/DragAndDropModal';
import style from './ImageUploader.module.scss';

export const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [DNDModalWrapper, openDND, closeDND] = useModal();
  const [CropperModalWrapper, openCropper, closeCropper] = useModal();
  const { avatar } = useSelector(state => state.user);
  const { UploadFileIcon } = appIcons;

  return (
    <>
      <div className={style.imageUploader}>
        <img src={avatar} alt="userImage" />
        <div className={style.info}>
          <span>Upload a New Profile Image</span>
          <button onClick={openDND}>
            <UploadFileIcon />
            Choose File
          </button>
          <span>or drag and drop an image here</span>
          <span>Ideal dimensions are 500px x 500px.</span>
          <span>Maximum file size is 5mb.</span>
        </div>
      </div>

      <DNDModalWrapper>
        <DragAndDropModal
          openCropper={openCropper}
          closeCropper={closeCropper}
          closeDND={closeDND}
          setImageUrl={setImageUrl}
        />
      </DNDModalWrapper>

      <CropperModalWrapper>
        <CropperModal
          closeCropper={closeCropper}
          closeDND={closeDND}
          imageUrl={imageUrl}
        />
      </CropperModalWrapper>
    </>
  );
};
