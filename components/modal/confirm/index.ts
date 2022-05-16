import React from 'react'
import { createRoot } from 'react-dom/client'
import { ConfirmModal } from './ConfirmModal'
import { Portal, confirmModalRootId, createRootContainer } from '../portal'

// https://github.com/serrexlabs/react-confirm-box

type ClassNames = {
  container?: string
  buttons?: string
  confirmButton?: string
  cancelButton?: string
}

export type Options = {
  labels?: { confirmable: string; cancellable: string }
  classNames?: ClassNames
  closeOnOverlayClick?: boolean
  render?: (
    message: string,
    onConfirm: () => void,
    onCancel: () => void,
  ) => Element
  children?: React.ReactNode
}

export const confirm = async (
  message: string,
  options?: Options,
): Promise<boolean> => {
  // 마운트 될 요소를 찾고, 없으면 생성
  let mount = document.getElementById(confirmModalRootId)
  if (!mount) {
    mount = createRootContainer(confirmModalRootId)
  }

  if (mount) {
    const root = createRoot(mount)
    return new Promise((resolve) => {
      const ConfirmModalEl = React.createElement(ConfirmModal, {
        resolver: (response) => {
          resolve(response)
          root.unmount()
        },
        message,
        options,
      })
      // 포탈에 컨펌모달을 합성
      const PortalEl = React.createElement(
        Portal,
        { rootId: confirmModalRootId, children: ConfirmModalEl },
        ConfirmModalEl,
      )

      root.render(PortalEl)
    })
  }
  return new Promise(() => {})
}
