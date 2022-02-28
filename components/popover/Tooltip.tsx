import React, { useRef } from 'react'

interface TooltipProps {
  children: React.ReactChild
  tooltipText?: string
}

const Tooltip = ({ children, tooltipText }: TooltipProps) => {
  const tipRef = useRef<HTMLDivElement>(null)
  function handleMouseEnter() {
    if (tipRef.current) {
      tipRef.current.style.opacity = '1'
      tipRef.current.style.marginTop = '0px'
    }
  }
  function handleMouseLeave() {
    if (tipRef.current) {
      tipRef.current.style.opacity = '0'
      tipRef.current.style.marginTop = '10px'
    }
  }
  return (
    <div
      className="relative z-[15] flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ zIndex: 15 }}
    >
      <div
        className="whitespace-no-wrap absolute right-0 flex items-center rounded-lg bg-gray-700 px-4 py-3 text-white transition-all duration-150"
        style={{ bottom: '-140%', opacity: 0 }}
        ref={tipRef}
      >
        <div
          className="absolute h-2.5 w-2.5 bg-gray-700"
          style={{ right: '10px', top: '-5px', transform: 'rotate(45deg)' }}
        />
        {tooltipText}
      </div>
      {children}
    </div>
  )
}
export default Tooltip
