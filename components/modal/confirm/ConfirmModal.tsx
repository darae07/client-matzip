import React, { useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { XIcon } from '@heroicons/react/outline'
import ModalTransition from 'components/modal/ModalTransition'
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
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-auto min-w-[50%] max-w-3xl">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="border-blueGray-200 flex items-start justify-between rounded-t  p-5">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {message}
              </h3>
              <button
                className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-gray-400 outline-none focus:outline-none"
                onClick={onCancel}
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            {/*body*/}
            <div className="relative flex-auto">{options?.children}</div>
            {/*footer*/}
            <div className="flex items-center justify-end rounded-b  py-3 px-5">
              <button
                className="background-transparent mr-1 mb-1 px-4 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                type="button"
                onClick={onCancel}
              >
                취소
              </button>
              <button
                className="mr-1 mb-1 rounded bg-blue-500 px-4 py-2 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                type="button"
                onClick={() => onConfirm}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  ) : null
}
