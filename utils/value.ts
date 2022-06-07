export const calculatePercent = (num: number, den: number): number => {
  if (num === 0 || den === 0) return 0
  return Math.round((num / den) * 100)
}

export const printDateTimeForToday = (value: string): string => {
  if (!value) ''
  const today = new Date()
  const timeValue = new Date(value)

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60,
  )
  if (betweenTime < 1) '방금 전'
  if (betweenTime < 60) `${betweenTime}분 전`

  const betweenTimeHour = Math.floor(betweenTime / 60)
  if (betweenTimeHour < 24) `${betweenTime}시간 전`

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24)
  if (betweenTimeDay === 1) `하루 전`

  return `${timeValue.getFullYear()}년 ${
    timeValue.getMonth() + 1
  }월 ${timeValue.getDate()}일`
}
