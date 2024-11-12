import React from 'react';
import Modal from 'react-modal';
import styles from './modalCp.module.scss';

const ModalCp = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modalStyles}
      overlayClassName={styles.modalOverlay}
    >
      {children}
    </Modal>
  );
};

export default ModalCp;
