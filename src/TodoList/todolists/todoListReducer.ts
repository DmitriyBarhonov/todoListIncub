
import { TodoListType, todoListsAPI } from '../../api/todolist-api';
import { Dispatch } from "redux"
import { AppActionsType, AppStateType, ThunkCreatorType } from '../../app/store';
import { ThunkAction } from 'redux-thunk';
import { SetStatusType, setStatusAC } from '../../app/appReducer';



// Types
export type TodolistsDomainType = TodoListType & {
    filter: FliterValuesType
}
export type FliterValuesType = 'all' | 'active' | 'completed' | 'firstThre'

export type ActionTodoLitsType =
    ReturnType<typeof changeFilterAC>
    | ReturnType<typeof addTodoListsAC>
    | ReturnType<typeof updateTodoListTitleAC>
    | ReturnType<typeof deleteTodoListAC>
    | SetTodoListsACType
    | SetStatusType



// State
const initialState: TodolistsDomainType[] = []

// Reducer
export const todoListReducer = (state: TodolistsDomainType[] = initialState, action: ActionTodoLitsType): TodolistsDomainType[] => {

    switch (action.type) {
        case 'CHANGE-FILTER':
            return state.map(el => el.id === action.payload.todoListID ? { ...el, filter: action.payload.newFilterValue } : el)

        case "SET-TODO-LISTS":
            return action.payload.todos.map((t) => ({ ...t, filter: "all" }))

        case 'ADD-TODO':
            return [{ ...action.payload.todoListItem, filter: 'all', }, ...state]
        case "UPDATE-TITLE":
            return state.map(el => el.id === action.payload.todoListID ? { ...el, title: action.payload.title } : el)

        case "DELETE-TODO":
            return state.filter(el => el.id !== action.payload.todoListID)

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
    const res = await todoListsAPI.getTodolists()
    dispatch(setTodoListsAC(res.data))
    dispatch(setStatusAC("succeeded"))
}
export const creacteTodolistsTС = (title: string): ThunkCreatorType => async (dispatch: Dispatch<ActionTodoLitsType>) => {
    dispatch(setStatusAC("loading"))
    const res = await todoListsAPI.creacteTodolists(title)
    dispatch(addTodoListsAC(res.data.data.item))
    dispatch(setStatusAC("succeeded"))
}

export const deleteTodolistsTС = (todoListID: string): ThunkCreatorType => async (dispatch: Dispatch<ActionTodoLitsType>) => {
    dispatch(setStatusAC("loading"))
    await todoListsAPI.deleteTodolists(todoListID)
    dispatch(deleteTodoListAC(todoListID))
    dispatch(setStatusAC("succeeded"))
}
export const updateTitleTodolistsTС = (todoListID: string, title: string) => async (dispatch: Dispatch<ActionTodoLitsType>) => {
    dispatch(setStatusAC("loading"))
    const res = await todoListsAPI.updateTitleTodolists(todoListID, title)
    dispatch(updateTodoListTitleAC(todoListID, title))
    dispatch(setStatusAC("succeeded"))
    console.log(res);
}

