import { createPopper } from '@popperjs/core'
import React, {
  createContext,
  useContext,
  useState,
  HTMLAttributes,
  createRef,
} from 'react'
import classNames from 'classnames'

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
  children: React.ReactChild
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
    <div className=" relative">
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
  const { isOpen, handleOpen, handleClose, popoverDropdownRef } =
    usePopoverContext()

  return (
    <div
      ref={popoverDropdownRef}
      className={classNames(
        'absolute block w-screen min-w-[12rem] bg-white',
        className,
      )}
    >
      {isOpen && children}
    </div>
  )
}

Popover.Button = Button
Popover.Panel = Panel
