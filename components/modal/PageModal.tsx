import { ModalLayoutProps } from 'type/ui'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { Fragment, useRef } from 'react'
import { XIcon } from '@heroicons/react/outline'
import ModalTransition from 'components/modal/ModalTransition'

const PageModal = ({ children, closeAction }: ModalLayoutProps) => {
  const router = useRouter()
  const closeModal = () => {
    if (closeAction) closeAction()
    router.back()
  }

  const cancelButtonRef = useRef(null)

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[21] overflow-y-auto "
        onClose={() => { }}
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
            <div className="my-8 inline-block w-full max-w-screen-md transform overflow-y-auto overflow-x-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">
              <button
                type="button"
                className="absolute right-6 text-gray-400"
                onClick={closeModal}
              >
                <XIcon className="h-6 w-6" />
              </button>
              {children}
            </div>
          </ModalTransition>
        </div>
      </Dialog>
    </Transition>
  )
}

export default PageModal
