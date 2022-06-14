import React, {
  createContext,
  useContext,
  useState,
  HTMLAttributes,
} from 'react'

interface PopoverContextValue {
  isOpen: boolean
  handleOpen: Function
  handleClose: Function
}

const PopoverContextInitialValue = {
  isOpen: false,
  handleOpen: () => {},
  handleClose: () => {},
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
const Popover = ({ children }: PopoverProps) => {
  const [isOpen, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const contextValue = { isOpen, handleClose, handleOpen }
  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  )
}

const Button = () => {
  const { isOpen, handleOpen, handleClose } = usePopoverContext()
}

const Panel = () => {
  const { isOpen, handleOpen, handleClose } = usePopoverContext()
}

Popover.Button = Button
Popover.Panel = Panel
