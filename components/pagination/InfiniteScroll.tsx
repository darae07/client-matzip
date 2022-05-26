import { HTMLAttributes, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface Props extends HTMLAttributes<HTMLDivElement> {
  fetchNextPage: () => {}
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
}
export const InfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Props) => {
  const { ref, inView, entry } = useInView()

  useEffect(() => {
    if (!hasNextPage) return
    if (inView && !isFetchingNextPage) fetchNextPage()
  }, [inView, hasNextPage])

  return (
    <div role="infiniteScroll" ref={ref}>
      {isFetchingNextPage && <div role="loadingIndicator">loading...</div>}
    </div>
  )
}
