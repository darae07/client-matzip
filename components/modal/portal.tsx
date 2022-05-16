import { ReactNode, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  children: Element | ReactNode
  rootId: string
}
export const defaultModalRootId = 'modal-root'
export const confirmModalRootId = 'confirm-modal-root'

export const createRootContainer = (rootId: string): HTMLElement => {
  const rootMount = document.createElement('div')
  rootMount.setAttribute('id', rootId)
  document.body.appendChild(rootMount)
  return rootMount
}
export const Portal: React.FC<Props> = ({ children, rootId }: Props) => {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null)

  useLayoutEffect(() => {
    let root = document.getElementById(rootId)
    let systemCreated = false
    if (!root) {
      systemCreated = true
      root = createRootContainer(rootId)
    }
    setRootElement(root)

    return () => {
      if (systemCreated && root?.parentNode) {
        root.parentNode.removeChild(root)
      }
    }
  }, [rootId])

  if (rootElement === null) return null
  return createPortal(children, rootElement)
}
