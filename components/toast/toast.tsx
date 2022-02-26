import React, { FC, Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useAppDispatch, useAppSelector } from 'hooks'
import { closeToast } from 'store/modules/ui/toast'

export const Toast: FC = () => {
  const { isOpen, message, disappearTime } = useAppSelector((state) => ({
    isOpen: state.toast.isOpen,
    message: state.toast.message,
    disappearTime: state.toast.disappearTime,
  }))

  const dispatch = useAppDispatch()
  const handleCloseToast = () => {
    dispatch(closeToast())
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        handleCloseToast()
      }, disappearTime)
    }
  }, [isOpen])

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-y-auto"
        onClose={() => {}}
      >
        <div className="min-h-screen  px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-3/4  max-w-sm translate-y-0 transform overflow-hidden rounded bg-gray-900  py-2 px-4 text-left opacity-80 shadow-xl transition-all">
              <p className="text-white">{message}</p>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
