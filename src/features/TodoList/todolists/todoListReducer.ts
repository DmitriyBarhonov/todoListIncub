
import { ResultCode, TodoListType, todoListsAPI } from '../../../api/todolist-api';
import { Dispatch } from "redux"
import { ThunkCreatorType } from '../../../app/store';
import { RequestStatusType, SetErrorType, SetStatusType, setStatusAC } from '../../../app/appReducer';
import {handleServerNetworkError } from '../../../utils/errorUtils';
import axios from 'axios';



// Types
export type TodolistsDomainType = TodoListType & {
    filter: FliterValuesType
    entityStatus: RequestStatusType
}
export type FliterValuesType = 'all' | 'active' | 'completed' | 'firstThre'

export type ActionTodoLitsType =
    ReturnType<typeof changeFilterAC>
    | ReturnType<typeof addTodoListsAC>
    | ReturnType<typeof updateTodoListTitleAC>
    | ReturnType<typeof deleteTodoListAC>
    | ReturnType<typeof changeTodoListStatusAC>
    | SetTodoListsACType
    | SetStatusType
    | SetErrorType

type ErrorType = {
    statusCode: number,
    messages: [
        {
            message: string,
            field: string
        }
    ],
    error: string
}

// State
const initialState: TodolistsDomainType[] = []

// Reducer
export const todoListReducer = (state: TodolistsDomainType[] = initialState, action: ActionTodoLitsType): TodolistsDomainType[] => {

    switch (action.type) {
        case 'CHANGE-FILTER':
            return state.map(el => el.id === action.payload.todoListID ? { ...el, filter: action.payload.newFilterValue } : el)

        case "SET-TODO-LISTS":
            return action.payload.todos.map((t) => ({ ...t, filter: "all", entityStatus: 'idle' }))

        case 'ADD-TODO':
            return [{ ...action.payload.todoListItem, filter: 'all', entityStatus: 'idle' }, ...state]
        case "UPDATE-TITLE":
            return state.map(el => el.id === action.payload.todoListID ? { ...el, title: action.payload.title } : el)

        case "DELETE-TODO":
            return state.filter(el => el.id !== action.payload.todoListID)
        case "CHANGE-TODOLIST-STATUS":
            return state.map(el => el.id === action.payload.todoListID ? { ...el, entityStatus: action.payload.entityStatus } : el)

        default:
            return state
    }
}


// Actions-------------------------------------------------------------------


export const changeFilterAC = (todoListID: string, newFilterValue: FliterValuesType) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
            todoListID,
            newFilterValue
        }
    } as const
}
export const changeTodoListStatusAC = (todoListID: string, entityStatus: RequestStatusType) => {
    return {
        type: "CHANGE-TODOLIST-STATUS",
        payload: {
            todoListID,
            entityStatus
        }
    } as const
}

export const addTodoListsAC = (todoListItem: TodoListType) => {
    return {
        type: "ADD-TODO",
        payload: {
            todoListItem
        }
    } as const
}

export const deleteTodoListAC = (todoListID: string) => {
    return {
        type: "DELETE-TODO",
        payload: {
            todoListID
        }
    } as const
}

export const updateTodoListTitleAC = (todoListID: string, title: string) => {
    return {
        type: "UPDATE-TITLE",
        payload: {
            todoListID,
            title
        }
    } as const
}

export type SetTodoListsACType = ReturnType<typeof setTodoListsAC>
export const setTodoListsAC = (todos: TodoListType[]) => {
    return {
        type: "SET-TODO-LISTS",
        payload: {
            todos
        }
    } as const
}

// Thunks-------------------------------------------------------------------

export const getTodoListTС = (): ThunkCreatorType => async (dispatch: Dispatch<ActionTodoLitsType>) => {
    dispatch(setStatusAC("loading"))
    try {
        const res = await todoListsAPI.getTodolists()
        dispatch(setTodoListsAC(res.data))
        dispatch(setStatusAC("succeeded"))
    } catch (e) {
        // error netWork
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ? e.response?.data.messages[0].message : e.message
            handleServerNetworkError(dispatch, error)
            return
        }
        const error = (e as Error).message
        handleServerNetworkError(dispatch, error)
    }
}
export const creacteTodolistsTС = (title: string): ThunkCreatorType => async (dispatch: Dispatch<ActionTodoLitsType>) => {
    dispatch(setStatusAC("loading"))
    try {
        const res = await todoListsAPI.creacteTodolists(title)
        dispatch(addTodoListsAC(res.data.data.item))
        dispatch(setStatusAC("succeeded"))

    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ? e.response?.data.messages[0].message : e.message
            handleServerNetworkError(dispatch, error)
            return
        }
        const error = (e as Error).message
        handleServerNetworkError(dispatch, error)
    }
}

export const deleteTodolistsTС = (todoListID: string): ThunkCreatorType => async (dispatch: Dispatch<ActionTodoLitsType>) => {
    dispatch(changeTodoListStatusAC(todoListID, "loading"))
    dispatch(setStatusAC("loading"))

    try {
        const res = await todoListsAPI.deleteTodolists(todoListID)

        dispatch(deleteTodoListAC(todoListID))
        dispatch(setStatusAC("succeeded"))

    } catch (e) {
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ? e.response?.data.messages[0].message : e.message
            handleServerNetworkError(dispatch, error)
            dispatch(changeTodoListStatusAC(todoListID, "idle"))
            return
        }
        const error = (e as Error).message
        handleServerNetworkError(dispatch, error)
        dispatch(changeTodoListStatusAC(todoListID, "idle"))
    }
}
export const updateTitleTodolistsTС = (todoListID: string, title: string) => async (dispatch: Dispatch<ActionTodoLitsType>) => {
    dispatch(setStatusAC("loading"))
    try {
        await todoListsAPI.updateTitleTodolists(todoListID, title)
        dispatch(updateTodoListTitleAC(todoListID, title))
        dispatch(setStatusAC("succeeded"))
    } catch (e) {
        // error netWork
        if (axios.isAxiosError<ErrorType>(e)) {
            const error = e.response ? e.response?.data.messages[0].message : e.message
            handleServerNetworkError(dispatch, error)
            return
        }
        const error = (e as Error).message
        handleServerNetworkError(dispatch, error)
    }
}
