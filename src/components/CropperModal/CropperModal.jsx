import { useRef } from 'react';
import Cropper from 'react-easy-crop';
import { GrClose } from 'react-icons/gr/index';
import { useDispatch, useSelector } from 'react-redux';
import { appIcons } from '../../assets/img';
import { useCrop } from '../../hooks';
import { changeAvatar } from '../../store/user/actions/changeAvatar';
import style from './CropperModal.module.scss';

export const CropperModal = ({ closeCropper, closeDND, imageUrl }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const formRef = useRef();
  const { crop, zoom, setZoom, onCropChange, onZoomChange, onCropCompleted, getResult } =
    useCrop(imageUrl);
  const { ArrowBackIcon } = appIcons;

  const handleSave = async e => {
    e.preventDefault();
    const avatarFile = await getResult();

    dispatch(changeAvatar({ user, file: avatarFile }));
    closeCropper();
    closeDND();
  };

  const handleClose = () => {
    closeCropper();
    closeDND();
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <ArrowBackIcon onClick={closeCropper} />
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
