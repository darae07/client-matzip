import { Keyword, ReviewScore } from '@/type'
import classNames from 'classnames'
import { useEffect, useState, HTMLAttributes } from 'react'
import { EmojiHappyIcon, EmojiSadIcon } from '@heroicons/react/outline'
import EmojiSosoIcon from '@/public/icon/EmojiSosoIcon'
import Link from 'next/link'

interface Props extends HTMLAttributes<HTMLSpanElement> {
  keyword: Keyword
}
export const KeywordName = ({ keyword, className }: Props) => {
  if (!keyword) return <></>
  return (
    <Link href={`/keyword/${keyword.id}`} passHref>
      <span
        className={classNames(
          'cursor-pointer font-bold text-blue-500',
          className,
        )}
      >
        {keyword?.name}
      </span>
    </Link>
  )
}

export const KeywordScore = ({ keyword, className }: Props) => {
  const [score, setScore] = useState<string>()
  useEffect(() => {
    keyword?.score && setScore(keyword.score?.toFixed(1))
  }, [keyword?.score])

  if (!keyword?.score) return <></>
  return (
    <div
      className={classNames(
        className,
        'flex items-center',
        Number(score) > 4 ? 'text-pink-500' : 'text-gray-400',
      )}
    >
      {Number(score) < 2 ? (
        <EmojiSadIcon className="h-5 w-5" />
      ) : Number(score) < 4 ? (
        <EmojiSosoIcon className="h-5 w-5" />
      ) : (
        <EmojiHappyIcon className="h-5 w-5" />
      )}
      <span className={classNames('ml-1 text-2xl')}>{score}</span>
    </div>
  )
}

interface KeywordScoreIconProps extends HTMLAttributes<HTMLSpanElement> {
  score: ReviewScore
}

export const KeywordScoreIcon = ({
  score,
  className,
}: KeywordScoreIconProps) => {
  if (!score) return <></>
  return (
    <span
      className={classNames(
        className,
        'flex w-16 flex-col items-center text-sm ',
        score === ReviewScore.GOOD ? 'text-pink-500' : 'text-gray-400',
      )}
    >
      {score === ReviewScore.BAD ? (
        <EmojiSadIcon className="h-7 w-7" />
      ) : score === ReviewScore.SOSO ? (
        <EmojiSosoIcon className="h-7 w-7" />
      ) : (
        <EmojiHappyIcon className="h-7 w-7" />
      )}
      <div>
        {score === ReviewScore.BAD
          ? '별로'
          : score === ReviewScore.SOSO
          ? '괜찮다'
          : '맛있다'}
      </div>
    </span>
  )
}
