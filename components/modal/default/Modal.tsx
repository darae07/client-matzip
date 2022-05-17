import React from 'react'
import { Portal, defaultModalRootId } from '../portal'
import { Modal as StyledModal } from '../style'
export interface ModalProps {
  isOpen: boolean
  children?: React.ReactChild
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
      <StyledModal>
        <StyledModal.Background role="modal">
          <StyledModal.Container>
            <StyledModal.Header>
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
