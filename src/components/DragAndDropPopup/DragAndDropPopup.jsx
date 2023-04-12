import React, { useState } from 'react';
import style from './DragAndDropPopup.module.scss';
import { ReactComponent as IconAddFile } from '../../assets/img/iconAddFile.svg';
import { usePopup } from '../../hooks/usePopup';
import { CropperPopup } from '../CropperPopup/CropperPopup';
import { getImageUrlFromFile } from '../../utils/getImageUrlFromFile';
import { GrClose } from 'react-icons/gr/index';
import { FaUpload } from 'react-icons/fa/index';

export const DragAndDropPopup = ({ isOpen, close }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const cropper = usePopup();

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const getUncroppedAvatar = async (event) => {
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
        isOpen={cropper.isPopupVisible}
        close={cropper.close}
        closeParent={close}
        imageUrl={imageUrl}
      />

      <div
        className={style.container}
        onDragEnter={handleDragEnter}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={handleDragLeave}
        // onDrop={getUncroppedAvatar}
      >
        <div className={style.header}>
          <FaUpload />

          <GrClose onClick={close} />
        </div>

        <label
          htmlFor="upload"
          className={style.dropArea}
          onDrop={getUncroppedAvatar}
        >
          <IconAddFile />
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
