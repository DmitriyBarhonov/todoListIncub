
import { TodoListType, todoListsAPI } from '../../api/todolist-api';
import { Dispatch } from "redux"




export type TodolistsDomainType = TodoListType & {
    filter: FliterValuesType
}
export type FliterValuesType = 'all' | 'active' | 'completed' | 'firstThre'

const initialState: TodolistsDomainType[] = []


export const todoListReducer = (state: TodolistsDomainType[] = initialState, action: AllAction): TodolistsDomainType[] => {

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

type AllAction =
    ReturnType<typeof changeFilterAC>
    | ReturnType<typeof addTodoListsAC>
    | ReturnType<typeof updateTodoListTitleAC>
    | ReturnType<typeof deleteTodoListAC>
    | SetTodoListsACType

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

export const getTodoListTС = () => (dispatch: Dispatch<AllAction>) => {
    todoListsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodoListsAC(res.data))
        })
}
export const creacteTodolistsTС = (title: string) => (dispatch: Dispatch<AllAction>) => {
    todoListsAPI.creacteTodolists(title)
        .then((res) => {
            dispatch(addTodoListsAC(res.data.data.item))
            console.log(res.data);

        })
}

export const deleteTodolistsTС = (todoListID: string) => (dispatch: Dispatch<AllAction>) => {
    todoListsAPI.deleteTodolists(todoListID)
        .then((res) => {
            dispatch(deleteTodoListAC(todoListID))
            console.log(res.data);
        })
}
export const updateTitleTodolistsTС = (todoListID: string, title: string) => (dispatch: Dispatch<AllAction>) => {
    todoListsAPI.updateTitleTodolists(todoListID, title)
        .then((res) => {
            dispatch(updateTodoListTitleAC(todoListID, title))
            console.log(res);
        })
}

