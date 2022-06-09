import React, { HTMLAttributes, useRef } from 'react'
import { createPopper } from '@popperjs/core'

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactChild
  tooltipText?: string
}

const Tooltip = ({ children, tooltipText }: TooltipProps) => {
  const btnRef = useRef<HTMLDivElement>(null)
  const tipRef = useRef<HTMLDivElement>(null)

  function handleMouseEnter() {
    if (tipRef.current && btnRef.current) {
      createPopper(btnRef.current, tipRef.current, {
        placement: 'bottom',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ],
      })
      tipRef.current.style.opacity = '1'
    }
  }
  function handleMouseLeave() {
    if (tipRef.current) {
      tipRef.current.style.opacity = '0'
    }
  }
  return (
    <div
      ref={btnRef}
      className="relative flex w-fit items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute top-3 flex items-center rounded-lg bg-gray-700 px-4 py-3 text-xs text-white"
        style={{ opacity: 0, minWidth: '80px' }}
        ref={tipRef}
      >
        <div
          id="arrow"
          className="absolute left-1/2  -top-1 h-2.5 w-2.5 bg-gray-700"
          style={{ transform: 'rotate(45deg)' }}
        />
        <div className="w-fit whitespace-pre">{tooltipText}</div>
      </div>
      {children}
    </div>
  )
}
export { Tooltip }
