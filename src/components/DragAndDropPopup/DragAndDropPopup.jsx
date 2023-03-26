import React, { useState } from 'react';
import style from './DragAndDropPopup.module.scss';
import { ReactComponent as IconAddFile } from '../../assets/img/iconAddFile.svg';
import { usePopup } from '../../hooks/usePopup';
import { CropperPopup } from '../CropperPopup/CropperPopup';

export const DragAndDropPopup = ({ isOpen, close }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState({});
  const cropper = usePopup();

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setFile(files[0]);
    cropper.open();
  };

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
    cropper.open();
  };

  if (!isOpen) return null;
  return (
    <>
      <div className={style.overlay} onClick={close} />

      <CropperPopup
        isOpen={cropper.isPopupVisible}
        close={cropper.close}
        image={file}
      />

      <div
        className={style.container}
        onDragEnter={handleDragEnter}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={style.header}>
          <img
            src="https://static.filestackapi.com/picker/1.23.0/assets/images/navbar-local_file_system.svg"
            alt=""
          />
          <span onClick={close}>x</span>
        </div>
        <label for="upload" className={style.dropArea}>
          <IconAddFile />
          <span>Select Files to Upload</span>
          <span>or Drag and Drop, Copy and Paste Files</span>
          <input type="file" id="upload" onChange={handleUpload} hidden />
        </label>
      </div>
    </>
  );
};
