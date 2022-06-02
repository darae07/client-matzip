export const calculatePercent = (num: number, den: number): number => {
  if (num === 0 || den === 0) return 0
  return Math.round((num / den) * 100)
}
