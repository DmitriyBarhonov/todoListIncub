import { FliterValuesType, TodolistsType } from "../../App"




export const todoListReducer =(state: TodolistsType[], action: AllAction):TodolistsType[] =>{

    switch (action.type) {
        case 'CHANGE-FILTER':
            console.log(state);
             return state.map(el => el.id === action.payload.todoListID ? { ...el, filter: action.payload.newFilterValue } : el)
    
             case 'ADD-TODO':
                return [...state, action.payload.newTodoListItem]
             case "UPDATE-TITLE":
                return state.map(el => el.id === action.payload.todoListID ? { ...el, title: action.payload.title } : el)

        default:
            return state
    }
}

type AllAction = ChangeFilterACType | AddTodoListsACType | UpdateTodoListTitleACType


type ChangeFilterACType = ReturnType<typeof changeFilterAC> 

export const changeFilterAC = (todoListID: string, newFilterValue: FliterValuesType)=>{
    return{
        type: "CHANGE-FILTER",
        payload:{
            todoListID,
            newFilterValue
        }
    } as const
}

type AddTodoListsACType = ReturnType<typeof addTodoListsAC> 

export const addTodoListsAC = (newTodoListItem: TodolistsType)=>{
    return{
        type: "ADD-TODO",
        payload:{
            newTodoListItem,
        }
    } as const
}
type UpdateTodoListTitleACType = ReturnType<typeof updateTodoListTitleAC> 

export const updateTodoListTitleAC = (todoListID: string, title: string)=>{
    return{
        type: "UPDATE-TITLE",
        payload:{
            todoListID,
            title
        }
    } as const
}