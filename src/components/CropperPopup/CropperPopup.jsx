import { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { useDispatch, useSelector } from 'react-redux';
import { useCrop } from '../../hooks/useCrop';
import { setAvatar } from '../../store/user/userSlice';
import { changeAvatar } from '../../store/user/actions/changeAvatar';
import style from './CropperPopup.module.scss';

export const CropperPopup = ({ isOpen, close, imageSrc, onCropComplete }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const {
    crop,
    zoom,
    setZoom,
    croppedArea,
    onCropChange,
    onZoomChange,
    onCropCompleted,
    getResult,
  } = useCrop(imageSrc);

  const handleSave = async () => {
    const avatar = await getResult();

    const formData = new FormData();
    formData.append('url', avatar);
    console.log(formData);
    dispatch(changeAvatar({ user, formData }));
  };

  if (!isOpen) return null;
  return (
    <div className={style.container}>
      <div className={style.header}>
        <span> goBack </span>
        <span> close </span>
      </div>

      <div className={style.cropContainer}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropCompleted}
        />
      </div>

      <div className={style.control}>
        <label>
          zoom
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => {
              setZoom(e.target.value);
            }}
            className="zoom-range"
          />
        </label>

        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};
