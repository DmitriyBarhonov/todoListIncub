import { useSelector, TypedUseSelectorHook } from "react-redux";
import { AppStateType } from "../app/store";



export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector