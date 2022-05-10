import { createPortal } from 'react-dom';

import classes from './Modal.module.css';
import {
  AnyElementOrComponentType,
  StringType,
  VoidFunctionType,
} from '../../../helpers/types';

const Backdrop = ({ className = '', onClick }) => {
  return (
    <div className={`${className} ${classes.backdrop}`} onClick={onClick}></div>
  );
};

const Modal = ({
  children,
  modalClassName = '',
  backdropClassName = '',
  onExit,
}) => {
  return (
    <>
      {createPortal(
        <Backdrop className={backdropClassName} onClick={onExit} />,
        document.getElementById('backdrop')
      )}
      {createPortal(
        <div className={`${modalClassName} ${classes.modal}`}>{children}</div>,
        document.getElementById('modal')
      )}
    </>
  );
};

Backdrop.propTypes = {
  className: StringType,
  onClick: VoidFunctionType,
};

Modal.propTypes = {
  modalClassName: StringType,
  backdropClassName: StringType,
  children: AnyElementOrComponentType,
  onExit: VoidFunctionType,
};

export default Modal;
