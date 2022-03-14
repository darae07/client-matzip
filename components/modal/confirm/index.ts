import React, { useEffect } from 'react'
import ReactDOM, { createPortal } from 'react-dom'
import { ConfirmModal } from './ConfirmModal'

// https://github.com/serrexlabs/react-confirm-box

type Props = {
  children: Element
}
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

const mountRootId = 'confirm-box-root'

// portal: 부모 계층에 종속되지 않고 컴포넌트를 렌더링
const Portal: React.FC<Props> = ({ children }: Props) => {
  const mount = document.getElementById(mountRootId) as HTMLElement
  const el = document.createElement('div')

  useEffect((): any => {
    mount.appendChild(el)
    return () => mount.removeChild(el)
  }, [el, mount])

  return createPortal(children, el)
}

export const confirm = async (
  message: string,
  options?: Options,
): Promise<any> => {
  // 마운트 될 요소를 찾고, 없으면 생성
  const mount = await document.getElementById(mountRootId)
  if (!mount) {
    const rootMount = await document.createElement('div')
    await rootMount.setAttribute('id', mountRootId)
    document.body.appendChild(rootMount)
  }

  return new Promise((resolve) => {
    const ConfirmModalEl = React.createElement(ConfirmModal, {
      resolver: resolve,
      message,
      options,
    })
    // 포탈에 컨펌모달을 칠드런으로 전달
    const PortalEl = React.createElement(Portal, null, ConfirmModalEl)
    ReactDOM.render(PortalEl, document.getElementById(mountRootId))
  })
}
