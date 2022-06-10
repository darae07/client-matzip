import React from 'react'
import { Portal, defaultModalRootId } from '../portal'
import { ContentSize, Modal as StyledModal } from '../style'
export type ModalProps = {
  isOpen: boolean
  children?: React.ReactChild
  handleClose: Function
  title?: string
} & ContentSize

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  handleClose,
  title,
  size = 'medium',
}) => {
  if (!isOpen) return null

  return (
    <Portal rootId={defaultModalRootId}>
      <StyledModal>
        <StyledModal.Background role="modal">
          <StyledModal.Container size={size}>
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
