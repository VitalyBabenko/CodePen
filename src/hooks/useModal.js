import { useState } from 'react';
import Modal from 'react-modal';

const modalDefaultStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
    cursor: 'pointer',
  },
  content: {
    margin: '0 auto',
  },
};

Modal.setAppElement('#root');
Modal.defaultStyles = modalDefaultStyles;

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const ModalComponent = ({ children, ...rest }) => (
    <Modal isOpen={isOpen} onRequestClose={closeModal} ariaHideApp={false} {...rest}>
      {children}
    </Modal>
  );

  return [ModalComponent, openModal, closeModal];
};
