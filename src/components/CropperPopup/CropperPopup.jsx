import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import style from './CropperPopup.module.scss';

export const CropperPopup = ({ isOpen, close, image, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState({
    x: 5,
    y: 5,
    width: 200,
    height: 200,
  });

  const onCropChange = useCallback((crop) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom) => {
    setZoom(zoom);
  }, []);

  const onCropCompleted = useCallback((_, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  console.log(image);

  if (!isOpen) return null;
  return (
    <div className={style.cropper}>
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
        onCropComplete={onCropCompleted}
      />
      <div className={style.control}>
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
      </div>
      <button onClick={() => onCropComplete(croppedArea, croppedArea)}>
        Crop Image
      </button>
    </div>
  );
};
