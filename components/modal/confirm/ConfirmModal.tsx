import React, { useEffect } from 'react'
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
  const closeModal = () => {}

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[25] overflow-y-auto "
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <ModalTransition>
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
          </ModalTransition>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <ModalTransition>
            <div className="my-8 inline-block w-full max-w-screen-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <button
                type="button"
                className="absolute right-6 text-gray-400"
                onClick={closeModal}
              >
                <XIcon className="h-6 w-6" />
              </button>
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {message}
              </Dialog.Title>

              {options?.children}
            </div>
          </ModalTransition>
        </div>
      </Dialog>
    </Transition>
  )
}
