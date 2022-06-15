import { XIcon } from '@heroicons/react/outline'
interface CloseButtonProps {
  className?: string
  name?: string
  onClick: () => void
}

export const CloseButton = ({ className, name, onClick }: CloseButtonProps) => {
  return (
    <button
      aria-label="close"
      className={className}
      name={name}
      onClick={onClick}
      type="button"
    >
      <XIcon className="h-6 w-6" />
    </button>
  )
}
