import { useSelector, TypedUseSelectorHook } from "react-redux";
import { StateType } from "../store/store";



export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector