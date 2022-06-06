import React, { forwardRef } from 'react'
import { LiHTMLAttributes } from 'react'
import { WhiteRoundedCard } from '@/components'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface ThumbnailProps {
  src?: string
  alt?: string
  href: string
}

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  isPreviousData?: boolean
  thumbnailProps?: ThumbnailProps
}

export const ListItem = ({
  children,
  isPreviousData,
  thumbnailProps,
  ...props
}: Props) => (
  <li
    {...props}
    className={classNames('flex flex-col', { 'opacity-50': isPreviousData })}
  >
    {thumbnailProps?.src && (
      <Link href={thumbnailProps.href} passHref>
        <Thumbnail {...thumbnailProps} />
      </Link>
    )}
    <WhiteRoundedCard className="h-full" flatTop={!!thumbnailProps?.src}>
      {children}
    </WhiteRoundedCard>
  </li>
)

const Thumbnail = forwardRef<HTMLDivElement, ThumbnailProps>(
  ({ src = '', alt = '', href }, ref) => {
    const router = useRouter()
    const handlePush = () => router.push(href)
    return (
      <div
        className="relative h-40 w-full shrink-0"
        ref={ref}
        onClick={handlePush}
      >
        {src && (
          <Image
            src={src}
            alt={alt}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        )}
      </div>
    )
  },
)
