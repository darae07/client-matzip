import { createPopper } from '@popperjs/core'
import React, {
  createContext,
  useContext,
  useState,
  HTMLAttributes,
  createRef,
  useEffect,
} from 'react'
import classNames from 'classnames'
import { CloseButton } from '@/components'

interface PopoverContextValue {
  isOpen: boolean
  handleOpen: Function
  handleClose: Function
  btnDropdownRef: any
  popoverDropdownRef: any
}

const PopoverContextInitialValue = {
  isOpen: false,
  handleOpen: () => {},
  handleClose: () => {},
  btnDropdownRef: null,
  popoverDropdownRef: null,
}
const PopoverContext = createContext<PopoverContextValue>(
  PopoverContextInitialValue,
)

const usePopoverContext = () => {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error(
      'Popover 조합 컴포넌트는 Popover 컴포넌트 외부에서 사용할 수 없습니다.',
    )
  }
  return context
}

interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  tooltipText?: string
}
export const Popover = ({ children }: PopoverProps) => {
  const [isOpen, setOpen] = useState(false)

  const btnDropdownRef = createRef<HTMLDivElement>()
  const popoverDropdownRef = createRef<HTMLDivElement>()
  const handleOpen = () => {
    if (!btnDropdownRef.current || !popoverDropdownRef.current) return
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-end',
    })
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const contextValue = {
    isOpen,
    handleClose,
    handleOpen,
    btnDropdownRef,
    popoverDropdownRef,
  }
  return (
    <div className="relative">
      <PopoverContext.Provider value={contextValue}>
        {children}
      </PopoverContext.Provider>
    </div>
  )
}

interface PopoverButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactChild
}
const Button = ({ children }: PopoverButtonProps) => {
  const { isOpen, handleOpen, handleClose, btnDropdownRef } =
    usePopoverContext()

  const handleButtonClick = () => {
    if (isOpen) {
      handleClose()
    } else {
      handleOpen()
    }
  }
  return (
    <button type="button" onClick={handleButtonClick} ref={btnDropdownRef}>
      {children}
    </button>
  )
}

interface PopoverPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactChild
}
const Panel = ({ children, className }: PopoverPanelProps) => {
  const { isOpen, handleClose, popoverDropdownRef, btnDropdownRef } =
    usePopoverContext()

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        popoverDropdownRef.current &&
        !popoverDropdownRef?.current?.contains(e.target) &&
        btnDropdownRef.current &&
        !btnDropdownRef?.current?.contains(e.target)
      ) {
        handleClose()
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => document.removeEventListener('click', handleClickOutside)
  }, [popoverDropdownRef])

  return (
    <div
      ref={popoverDropdownRef}
      className={classNames(
        'absolute z-[20] block w-[97vw] min-w-[12rem] bg-white',
        className,
      )}
    >
      {isOpen && (
        <CloseButton
          className={classNames(
            className,
            'absolute right-3 z-[29] p-5 pl-10 text-gray-400 sm:hidden',
          )}
          name="close"
          onClick={() => handleClose()}
        />
      )}

      {isOpen && children}
    </div>
  )
}

Popover.Button = Button
Popover.Panel = Panel
