import React, { useState } from 'react'
import { XIcon } from '@heroicons/react/outline'
import { Options } from '.'

type ModalProps = {
  message: string
  resolver: (decision: boolean) => void
  options?: Options
}

export const ConfirmModal: React.FC<ModalProps> = ({
  resolver,
  message,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(true)

  const onConfirm = () => {
    setIsOpen(false)
    resolver(true)
  }
  const onCancel = () => {
    setIsOpen(false)
    resolver(false)
  }

  return isOpen ? (
    <>
      <div role="confirm-modal">
        <h3>{message}</h3>
        <button className="float-right" onClick={onCancel}>
          <XIcon className="h-6 w-6" />
        </button>
      </div>
      <div>{options?.children}</div>
      <div>
        <button type="button" onClick={onCancel}>
          취소
        </button>
        <button type="button" onClick={onConfirm}>
          확인
        </button>
      </div>
    </>
  ) : null
}
