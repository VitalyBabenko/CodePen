import React from 'react';
import style from './ImageUploader.module.scss';
import initialUserImage from '../../assets/img/initialUserImage.jpeg';

export const ImageUploader = () => {
  return (
    <div className={style.imageUploader}>
      <img src={initialUserImage} alt="userImage" />
      <div className={style.info}>
        <span>Upload a New Profile Image</span>
        <button>Choose File</button>
        <span>Ideal dimensions are 500px x 500px.</span>
        <span>Maximum file size is 5mb.</span>
      </div>
    </div>
  );
};
