import { useSelector } from 'react-redux'
import { RootState } from 'store'

type StateSelector<T> = (state: RootState) => T
type EqualityFn<T> = (left: T, right: T) => boolean

export function useRootState<T>(
  selector: StateSelector<T>,
  equalityFn?: EqualityFn<T>,
) {
  return useSelector(selector, equalityFn)
}
