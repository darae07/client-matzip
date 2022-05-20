import React from 'react'
import { Portal, defaultModalRootId } from '../portal'
import { Modal as StyledModal } from '../style'
export interface ModalProps {
  isOpen: boolean
  children?: React.ReactChild
  handleClose: Function
  title?: string
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  handleClose,
  title,
}) => {
  if (!isOpen) return null

  return (
    <Portal rootId={defaultModalRootId}>
      <StyledModal>
        <StyledModal.Background role="modal">
          <StyledModal.Container>
            <StyledModal.Header>
              {title && <StyledModal.Title>{title}</StyledModal.Title>}
              <StyledModal.CloseButton
                name="close"
                onClick={() => handleClose()}
              />
            </StyledModal.Header>
            <StyledModal.Body>{children}</StyledModal.Body>
          </StyledModal.Container>
        </StyledModal.Background>
        <StyledModal.BackArea />
      </StyledModal>
    </Portal>
  )
}
