
import { v1 } from 'uuid';
export type FliterValuesType = 'all' | 'active' | 'completed' | 'firstThre'
export type TodolistsType = { id: string, title: string, filter: FliterValuesType }

export let todolistID1 = v1()
export let todolistID2 = v1()

const initialState: TodolistsType[]  = [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
]


export const todoListReducer = (state: TodolistsType[] = initialState , action: AllAction): TodolistsType[] => {

    switch (action.type) {
        case 'CHANGE-FILTER':
            return state.map(el => el.id === action.payload.todoListID ? { ...el, filter: action.payload.newFilterValue } : el)

        case 'ADD-TODO':
            const newTodoListItem: TodolistsType = {
                id: action.payload.newTodoListId,
                title: action.payload.title,
                filter: 'all'
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

type AllAction = ChangeFilterACType | AddTodoListsACType | UpdateTodoListTitleACType | DeleteTodoListACType


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