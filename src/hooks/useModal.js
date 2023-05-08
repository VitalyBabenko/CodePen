import { useState } from 'react';
import Modal from 'react-modal';

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  zIndex: 2,
};

Modal.setAppElement('#root');

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const ModalComponent = ({ children, ...rest }) => (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={{
        overlay: {
          ...overlayStyle,
        },
      }}
      {...rest}
    >
      {children}
    </Modal>
  );

  return [ModalComponent, openModal, closeModal];
};
