import React, { useRef, useState } from 'react';
import style from './DragAndDropPopup.module.scss';
import { ReactComponent as IconAddFile } from '../../assets/img/iconAddFile.svg';
import { usePopup } from '../../hooks/usePopup';
import { CropperPopup } from '../CropperPopup/CropperPopup';
import { getImageUrlFromFile } from '../../utils/getImageUrlFromFile';
import { useDispatch, useSelector } from 'react-redux';
import { changeAvatar } from '../../store/user/actions/changeAvatar';

export const DragAndDropPopup = ({ isOpen, close }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const cropper = usePopup();
  const formRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragging(false);
    const image = await getImageUrlFromFile(event.dataTransfer.files[0]);
    setImageSrc(image);
    cropper.open();
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];

    dispatch(changeAvatar({ user, file }));
    // cropper.open();
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
        imageSrc={imageSrc}
      />

      <form
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
        <form
          action="/upload"
          method="post"
          encType="multipart/form-data"
          ref={formRef}
        >
          <label htmlFor="upload" className={style.dropArea}>
            <IconAddFile />
            <span>Select Files to Upload</span>
            <span>or Drag and Drop, Copy and Paste Files</span>

            <input
              type="file"
              id="upload"
              onChange={handleUpload}
              hidden
              accept="image/*,.png,.jpg.,.web"
            />
          </label>
        </form>
      </form>
    </>
  );
};
