import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RootState, AppDispatch } from "./store";

export function useAppSelector<T>(fn: (state: RootState) => T): T {
  return useSelector(fn, shallowEqual);
}
export const useAppDispatch = () => useDispatch<AppDispatch>();
