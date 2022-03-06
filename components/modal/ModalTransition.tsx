import { Transition } from '@headlessui/react'
import { LayoutProps } from 'type/ui'
import { Fragment } from 'react'

const ModalTransition = ({ children }: LayoutProps) => {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition.Child>
  )
}

export default ModalTransition
