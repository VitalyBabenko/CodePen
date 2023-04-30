import React, { useState } from 'react';
import { appIcons } from '../../assets/img';
import { usePopup } from '../../hooks';
import { getImageUrlFromFile } from '../../utils/getImageUrlFromFile';
import { CropperPopup } from '../CropperPopup/CropperPopup';
import style from './DragAndDropPopup.module.scss';

export const DragAndDropPopup = ({ isOpen, close }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
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
    cropper.open();
  };

  const handleClose = () => {
    close();
    cropper.close();
  };

  if (!isOpen) return null;
  return (
    <>
      <div className={style.overlay} onClick={handleClose} />

      <CropperPopup
        isOpen={cropper.isOpen}
        close={cropper.close}
        closeParent={close}
        imageUrl={imageUrl}
      />

      <div
        className={style.container}
        onDragEnter={handleDragEnter}
        onDragOver={e => e.preventDefault()}
        onDragLeave={handleDragLeave}
      >
        <div className={style.header}>
          <UploadIcon />

          <CloseIcon onClick={close} />
        </div>

        <label htmlFor="upload" className={style.dropArea} onDrop={getUncroppedAvatar}>
          <NewFileIcon />
          <span>Select Files to Upload</span>
          <span>or Drag and Drop, Copy and Paste Files</span>

          <input
            type="file"
            id="upload"
            onChange={getUncroppedAvatar}
            hidden
            accept="image/*,.png,.jpg.,.web"
          />
        </label>
      </div>
    </>
  );
};
