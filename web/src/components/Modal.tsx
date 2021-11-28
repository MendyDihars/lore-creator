import React from 'react';
import {
  Modal as ModalMUI,
  Fade,
  ClickAwayListener
} from '@mui/material';

interface Props {
  isOpen: boolean;
  toggle: any;
  children: JSX.Element | string;
}

const Modal = (props: Props) => {
  const { children, isOpen, toggle } = props;
  
  const handleExceptions = (event) => {
    if (event?.target !== document.body) {
      toggle(false)();
    }
  }
  
  return (
    <ModalMUI
      open={isOpen}
      onClose={toggle(false)}
      closeAfterTransition
    >
      <Fade in={isOpen}>
        <div className="modal">
          <ClickAwayListener onClickAway={handleExceptions}>
            <div className="modal-content">
              {children}
            </div>
          </ClickAwayListener>
        </div>
      </Fade>
    </ModalMUI>
  )
}

export default Modal;