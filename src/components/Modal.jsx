import React, { useEffect } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import './Modal.css';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
};

const Modal = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.classList.add('modal-open');
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          className="modal-backdrop"
          onClick={onClose}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Motion.button
              className="modal-close"
              onClick={onClose}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </Motion.button>

            {title && <h2 className="modal-title">{title}</h2>}

            <div className="modal-body">{children}</div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;








