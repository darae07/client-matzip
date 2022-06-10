import classNames from 'classnames'
import { PlusSmIcon } from '@heroicons/react/outline'
import { ButtonHTMLAttributes } from 'react'

interface PlusButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const PlusButton = ({ onClick }: PlusButtonProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="relative flex h-6 w-6 w-fit flex-col items-center rounded-full border bg-gray-100 font-bold text-gray-600"
    >
      <PlusSmIcon className="h-6 w-6" />
    </button>
  )
}
