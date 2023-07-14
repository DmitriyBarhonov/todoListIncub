import { Dispatch } from "redux"
import { SetErrorType, SetStatusType, setErrorAC, setStatusAC } from "../app/appReducer"
import { ResponseType } from "../api/todolist-api"


export const handServerAppError = <T> (data: ResponseType<T>, dispatch: ErrorUtilsDispatchType)=>{
    if (data.messages[0]) {
        dispatch(setErrorAC(data.messages[0] + "app"))
        dispatch(setStatusAC('succeeded'))
    } else {
        dispatch(setErrorAC("Some Error"))
        dispatch(setStatusAC('failed'))
    }
}

// Error Network

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, error: string)=>{
    dispatch(setErrorAC(error + "network"))
    dispatch(setStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetStatusType | SetErrorType>
