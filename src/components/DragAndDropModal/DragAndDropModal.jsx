import React, { useState } from 'react';
import { appIcons } from '../../assets/img';
import { usePopup } from '../../hooks';
import { getImageUrlFromFile } from '../../utils/getImageUrlFromFile';
// import { CropperPopup } from '../CropperModal/CropperModal';
import style from './DragAndDropModal.module.scss';

export const DragAndDropModal = ({
  openCropper,
  closeCropper,
  closeDND,
  setImageUrl,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const cropper = usePopup();
  const { NewFileIcon, UploadIcon, CloseIcon } = appIcons;

  const handleDragEnter = e => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const getUncroppedAvatar = async event => {
    event.preventDefault();
    setIsDragging(false);

    const isDrop = Boolean(event?.dataTransfer?.files?.length);
    const isChange = Boolean(event?.target?.files?.length);

    let file;
    if (isDrop) {
      file = event.dataTransfer.files[0];
    }

    if (isChange) {
      file = event.target.files[0];
    }

    const image = await getImageUrlFromFile(file);
    setImageUrl(image);
    openCropper();
  };

  const handleClose = () => {
    closeDND();
    closeCropper();
  };

  return (
    <div
      className={style.dndModal}
      onDragEnter={handleDragEnter}
      onDragOver={e => e.preventDefault()}
      onDragLeave={handleDragLeave}
    >
      <header>
        <UploadIcon />

        <CloseIcon onClick={closeDND} />
      </header>

      <label htmlFor="upload" onDrop={getUncroppedAvatar}>
        <NewFileIcon />
        <span>
          Select Files to Upload <br /> or Drag and Drop, Copy and Paste Files
        </span>

        <input
          type="file"
          id="upload"
          onChange={getUncroppedAvatar}
          hidden
          accept="image/*,.png,.jpg.,.web"
        />
      </label>
    </div>
  );
};
