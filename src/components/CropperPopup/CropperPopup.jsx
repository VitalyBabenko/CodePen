import Cropper from 'react-easy-crop';
import { useDispatch, useSelector } from 'react-redux';
import { useCrop } from '../../hooks/useCrop';
import { changeAvatar } from '../../store/user/actions/changeAvatar';
import style from './CropperPopup.module.scss';
import { useRef } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { GrClose } from 'react-icons/gr/index';

export const CropperPopup = ({ isOpen, close, closeParent, imageUrl }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const formRef = useRef();
  const { crop, zoom, setZoom, onCropChange, onZoomChange, onCropCompleted, getResult } = useCrop(imageUrl);

  const handleSave = async e => {
    e.preventDefault();
    const avatarFile = await getResult();

    dispatch(changeAvatar({ user, file: avatarFile }));
    close();
    closeParent();
  };

  const handleClose = () => {
    close();
    closeParent();
  };

  if (!isOpen) return null;
  return (
    <div className={style.container}>
      <div className={style.header}>
        <IoMdArrowBack onClick={close} />
        <GrClose onClick={handleClose} />
      </div>

      <div className={style.cropContainer}>
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropCompleted}
        />
      </div>

      <form action="/upload" method="post" encType="multipart/form-data" ref={formRef}>
        <div className={style.control}>
          <label>
            zoom
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={e => {
                setZoom(e.target.value);
              }}
              className="zoom-range"
            />
          </label>

          <button onClick={handleSave}>Save</button>
        </div>
      </form>
    </div>
  );
};
