import React from 'react'
import { Portal, defaultModalRootId } from '../portal'

export interface ModalProps {
  isOpen: boolean
  children?: Element
  handleClose: Function
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  handleClose,
}) => {
  if (!isOpen) return null

  return (
    <Portal rootId={defaultModalRootId}>
      <div role="modal">
        {children}
        <button
          className="float-right"
          name="close"
          onClick={() => handleClose()}
        >
          close
        </button>
      </div>
    </Portal>
  )
}
