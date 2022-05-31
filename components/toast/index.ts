import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { Toast } from './toast'
import { Portal, toastRootId, createRootContainer } from '@/components'

let root: Root
let systemCreated = false
export interface OpenToastOptionProps {}
export const openToast = (
  message: string,
  disappearTime: number = 2000,
  options?: OpenToastOptionProps,
) => {
  let mount = document.getElementById(toastRootId)
  if (!mount) {
    mount = createRootContainer(toastRootId)
  }

  if (mount) {
    if (!root || !systemCreated) {
      root = createRoot(mount)
      systemCreated = true
    }

    const ToastEl = React.createElement(Toast, { message, options })
    const PortalEl = React.createElement(
      Portal,
      { rootId: toastRootId },
      ToastEl,
    )
    root.render(PortalEl)

    const timer = setTimeout(() => {
      if (root) {
        root.unmount()
        systemCreated = false
      }
    }, disappearTime)
  }
}
