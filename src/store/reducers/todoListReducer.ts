
import { v1 } from 'uuid';
import { TodoListType, todoListsAPI } from '../../api/todolist-api';
import {Dispatch} from "redux"




export type TodolistsDomainType = TodoListType & {
    filter: FliterValuesType
}
export type FliterValuesType = 'all' | 'active' | 'completed' | 'firstThre'
export let todolistID1 = v1()
export let todolistID2 = v1()

const initialState: TodolistsDomainType[] = [
    // { id: todolistID1, title: 'What to learn', filter: 'all', addedDate: "", order: 0 },
    // { id: todolistID2, title: 'What to buy', filter: 'all', addedDate: "", order: 0 },
]


export const todoListReducer = (state: TodolistsDomainType[] = initialState, action: AllAction): TodolistsDomainType[] => {

    switch (action.type) {
        case 'CHANGE-FILTER':
            return state.map(el => el.id === action.payload.todoListID ? { ...el, filter: action.payload.newFilterValue } : el)

        case "SET-TODO-LISTS":
            return action.payload.todos.map((t) => ({ ...t, filter: "all" }))


        case 'ADD-TODO':
            const newTodoListItem: TodolistsDomainType = {
                id: action.payload.newTodoListId,
                title: action.payload.title,
                filter: 'all',
                addedDate: "",
                order: 0
            }
            return [...state, newTodoListItem]
        case "UPDATE-TITLE":
            return state.map(el => el.id === action.payload.todoListID ? { ...el, title: action.payload.title } : el)

        case "DELETE-TODO":
            return state.filter(el => el.id !== action.payload.todoListID)

        default:
            return state
    }
}

type AllAction = ChangeFilterACType | AddTodoListsACType | UpdateTodoListTitleACType | DeleteTodoListACType | SetTodoListsACType


type ChangeFilterACType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (todoListID: string, newFilterValue: FliterValuesType) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
            todoListID,
            newFilterValue
        }
    } as const
}

type AddTodoListsACType = ReturnType<typeof addTodoListsAC>

export const addTodoListsAC = (newTodoListId: string, title: string) => {
    return {
        type: "ADD-TODO",
        payload: {
            newTodoListId,
            title,
        }
    } as const
}

type DeleteTodoListACType = ReturnType<typeof deleteTodoListAC>

export const deleteTodoListAC = (todoListID: string) => {
    return {
        type: "DELETE-TODO",
        payload: {
            todoListID
        }
    } as const
}

type UpdateTodoListTitleACType = ReturnType<typeof updateTodoListTitleAC>

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

export const getTodoListTС = ()=> (dispatch:Dispatch) => {
    todoListsAPI.getTodolists()
        .then((data) => {
            dispatch(setTodoListsAC(data.data))
            console.log(data.data);

        })
}