import React from 'react'
import { Portal, defaultModalRootId } from '../portal'

export interface ModalProps {
  isOpen: boolean
  children?: Element
  handleClose?: Function
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  handleClose,
}) => {
  const closeButtonClicked = () => {
    if (handleClose) handleClose()
  }
  if (!isOpen) return null

  return (
    <Portal rootId={defaultModalRootId}>
      <div role="modal">
        {children}
        <button
          className="float-right"
          name="close"
          onClick={closeButtonClicked}
        >
          close
        </button>
      </div>
    </Portal>
  )
}
