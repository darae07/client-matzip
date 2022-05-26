import { render, screen } from '@testing-library/react'
import { InfiniteScroll } from '@/components'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'

describe('무한 스크롤 컴포넌트', () => {
  it('무한 스크롤 컴포넌트는 다음 페이지가 있을때만 화면에 들어올때 다음 페이지로 이동시키는 함수를 실행시킨다.', () => {
    const fetchNextPage = jest.fn()

    const { rerender } = render(
      <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={true} />,
    )
    const infiniteScroll = screen.queryByRole('infiniteScroll')
    expect(infiniteScroll).toBeInTheDocument()
    mockAllIsIntersecting(true)
    expect(fetchNextPage).toHaveBeenCalledTimes(1)

    rerender(
      <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={false} />,
    )
    mockAllIsIntersecting(false)
    expect(fetchNextPage).not.toHaveBeenCalledTimes(2)
  })
  it('로딩 상태를 나타내는 UI를 포함한다.', () => {
    const fetchNextPage = jest.fn()

    const { rerender } = render(
      <InfiniteScroll
        isFetchingNextPage={true}
        fetchNextPage={fetchNextPage}
      />,
    )
    const loadingIndicator = screen.queryByRole('loadingIndicator')
    expect(loadingIndicator).toBeInTheDocument()
    rerender(
      <InfiniteScroll
        isFetchingNextPage={false}
        fetchNextPage={fetchNextPage}
      />,
    )
    expect(loadingIndicator).not.toBeInTheDocument()
  })
})
