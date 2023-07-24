
import { Dispatch } from 'redux'
import { SetErrorType, SetInitializedType, SetStatusType, setInitializedAC, setStatusAC } from '../../app/appReducer'
import { LoginType } from './Login'
import { ResultCode, authAPI } from '../../api/todolist-api'
import { handleServerNetworkError } from '../../utils/errorUtils'
import axios from 'axios'
import { ErrorType } from '../TodoList/todolists/todoListReducer'


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value }
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({ type: 'login/SET-IS-LOGGED-IN', value } as const)

// thunks
export const loginTC = (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === ResultCode.succeeded) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setStatusAC('idle'))
        } else {
            handleServerNetworkError(dispatch, res.request.data.message[0])
        }
    } catch (error) {
        handleServerNetworkError(dispatch, "error")
    }
}
export const logOutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    try {
        const res = await authAPI.logOut()
        if (res.data.resultCode === ResultCode.succeeded) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setStatusAC('idle'))
        } else {
            handleServerNetworkError(dispatch, res.request.data.message[0])
        }
    } catch (error) {
        handleServerNetworkError(dispatch, "error")
    }
}

export const meAuthTC = () => async (dispatch: Dispatch<ActionsType>) => {
    // dispatch(setStatusAC('loading'))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.succeeded) {
            dispatch(setIsLoggedInAC(true))
            // dispatch(setStatusAC('succeeded'))
        }
    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ? e.response?.data.message : e.message
            handleServerNetworkError(dispatch, error)
            return
        }
        const error = (e as Error).message
        handleServerNetworkError(dispatch, error)
    }  finally {
            dispatch(setInitializedAC(true))
    }
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetStatusType | SetErrorType | SetInitializedType