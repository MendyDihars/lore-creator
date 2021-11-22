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
  return (
    <ModalMUI
      open={isOpen}
      onClose={toggle(false)}
      closeAfterTransition
    >
      <Fade in={isOpen}>
        <div className="modal">
          <ClickAwayListener onClickAway={toggle(false)}>
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