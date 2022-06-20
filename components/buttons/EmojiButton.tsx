import { ReviewScore } from '@/type/review'
import React, { ButtonHTMLAttributes } from 'react'
import EmojiSosoIcon from '@/public/icon/EmojiSosoIcon'
import { EmojiHappyIcon, EmojiSadIcon } from '@heroicons/react/outline'
import classNames from 'classnames'

interface EmojiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  emoji: ReviewScore
  score?: number
  setScore: Function
}

const emojiDic = {
  [ReviewScore.BAD]: <EmojiSadIcon />,
  [ReviewScore.GOOD]: <EmojiHappyIcon />,
  [ReviewScore.SOSO]: <EmojiSosoIcon />,
}

export const EmojiButton = ({ emoji, score, setScore }: EmojiButtonProps) => {
  const handleButtonClick = () => setScore(emoji)

  return (
    <button
      onClick={handleButtonClick}
      type="button"
      className={classNames(
        'flex w-fit flex-col items-center rounded-lg border px-5 py-2 font-bold',
        {
          'border-pink-500 text-pink-500': score === emoji,
        },
      )}
    >
      {emoji === ReviewScore.BAD ? (
        <EmojiSadIcon className="h-10 w-10" />
      ) : emoji === ReviewScore.SOSO ? (
        <EmojiSosoIcon className="h-10 w-10" />
      ) : (
        <EmojiHappyIcon className="h-10 w-10" />
      )}
      <span>
        {emoji === ReviewScore.BAD
          ? '별로'
          : emoji === ReviewScore.SOSO
          ? '괜찮다'
          : '맛있다'}
      </span>
    </button>
  )
}
