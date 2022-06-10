import classNames from 'classnames'
import { EmojiHappyIcon } from '@heroicons/react/outline'
import { ButtonHTMLAttributes } from 'react'

interface GoodButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isGood: boolean
  setIsGood: Function
}
export const GoodButton = ({ isGood, setIsGood }: GoodButtonProps) => {
  const handleButtonToggle = () => setIsGood(!isGood)
  return (
    <button
      onClick={handleButtonToggle}
      type="button"
      className={classNames(
        'flex w-fit flex-col items-center rounded-lg border px-5 py-2 font-bold',
        {
          'border-pink-500 text-pink-500': isGood,
        },
      )}
    >
      <EmojiHappyIcon className="h-10 w-10" />
      <span>맛있다</span>
    </button>
  )
}
