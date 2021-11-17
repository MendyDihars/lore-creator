import React, { Component } from 'react';
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

class Modal extends Component<Props, {}>{
  render() {
    const { children, isOpen, toggle } = this.props;
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
}

export default Modal;