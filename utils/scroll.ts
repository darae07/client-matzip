export const storeScrollPositionAndMoveToTop = () => {
  const scrollTop = scrollY || document.documentElement.scrollTop
  localStorage.setItem('scrollPosition', scrollTop + '')
  scrollTo(0, 0)
}
export const moveToScrollPosition = () => {
  const scroll = localStorage.getItem('scrollPosition')
  const scrollNum = scroll ? Number(scroll) : null
  if (scrollNum) {
    scrollTo(0, scrollNum)
  }
}
