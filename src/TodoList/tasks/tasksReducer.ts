import { AppStateType, ThunkCreatorType } from '../../app/store';
import { ResultCode, TaskPriority, TaskStatus, TaskType, UpdateTaskModelType, tasksAPI } from '../../api/todolist-api';
import { SetTodoListsACType } from '../todolists/todoListReducer';
import { SetStatusType, setStatusAC, SetErrorType } from '../../app/appReducer';
import { Dispatch } from 'redux';
import { handServerAppError, handleServerNetworkError } from '../../utils/errorUtils';
import axios, { AxiosError } from 'axios';

export type AssocTaskType = {
    [key: string]: TaskType[]
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatus
    priority?: TaskPriority
    startDate?: string
    deadline?: string
}

const initialState: AssocTaskType = {}
type AddPureTaskACType = ReturnType<typeof AddPureTaskAC>
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
export type ActionTasksType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof deleteAllTasksTaskAC>
    | ReturnType<typeof updateTaskTitleAC>
    | AddPureTaskACType
    | SetTodoListsACType
    | ReturnType<typeof SetTaskAC>
    | SetStatusType
    | SetErrorType

export const tasksReducer = (state: AssocTaskType = initialState, action: ActionTasksType): AssocTaskType => {

    switch (action.type) {
        // case  SetTodoList 
        case "SET-TODO-LISTS":
            const copyState = {
                ...state
            }
            action.payload.todos.forEach((el) => {
                copyState[el.id] = []
            })
            return copyState

        // Case Tasks
        case 'REMOVE-TASK':
            return { ...state, [action.payload.todoListID]: state[action.payload.todoListID].filter(el => el.id !== action.payload.taskId) }

        case 'SET-TASKS':
            return { ...state, [action.payload.todoListID]: action.payload.task }

        case "ADD-TASK":
            return { ...state, [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]] }

        case "ADD-PURE-TASK":
            return { ...state, [action.payload.todoListID]: [] }

        case "UPDATE-TASK":

            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID]
                    .map(t => t.id === action.payload.taskId ? { ...t, ...action.payload.model } : t)

            }

        case "DELETE-ALL":
            return { ...state, [action.payload.todoListID]: [] }
        default:
            return state
    }
}

// Actions-------------------------------------------------------------------

export const AddPureTaskAC = (todoListID: string) => {
    return {
        type: "ADD-PURE-TASK",
        payload: {
            todoListID,
        }
    } as const
}

export const removeTaskAC = (todoListID: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todoListID,
            taskId
        }
    } as const
}

export const addTaskTaskAC = (task: TaskType) => {
    return {
        type: "ADD-TASK",
        payload: {
            task
        }
    } as const
}

export const updateTaskAC = (todoListID: string, taskId: string, model: UpdateTaskModelType) => {

    return {
        type: "UPDATE-TASK",
        payload: {
            todoListID,
            taskId,
            model
        }
    } as const
}

export const deleteAllTasksTaskAC = (todoListID: string) => {
    return {
        type: "DELETE-ALL",
        payload: {
            todoListID,
        }
    } as const
}

export const updateTaskTitleAC = (todoListID: string, taskId: string, title: string) => {
    return {
        type: "UPDATE-TASK-TITLE",
        payload: {
            todoListID,
            taskId,
            title,
        }
    } as const
}

export const SetTaskAC = (task: TaskType[], todoListID: string) => {
    return {
        type: "SET-TASKS",
        payload: {
            task,
            todoListID
        }
    } as const
}


// Thunks-------------------------------------------------------------------
export const setTasksTС = (todoListID: string): ThunkCreatorType => async (dispatch: Dispatch<ActionTasksType>) => {
    dispatch(setStatusAC("loading"))
    try {
        const res = await tasksAPI.getTasks(todoListID)
        dispatch(SetTaskAC(res.data.items, todoListID))
        dispatch(setStatusAC('succeeded'))
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

export const deleteTaskTС = (todoListID: string, taskID: string): ThunkCreatorType => async (dispatch: Dispatch<ActionTasksType>) => {
    dispatch(setStatusAC("loading"))
    try {
        await tasksAPI.deleeteTask(todoListID, taskID)
        dispatch(removeTaskAC(todoListID, taskID))
        dispatch(setStatusAC('succeeded'))
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

export const addTaskTС = (todoListID: string, title: string): ThunkCreatorType => async (dispatch: Dispatch<ActionTasksType>) => {
    dispatch(setStatusAC("loading"))
    try {
        const res = await tasksAPI.creacteTask(todoListID, title)
        if (res.data.resultCode === ResultCode.succeeded) {
            dispatch(addTaskTaskAC(res.data.data.item))
            dispatch(setStatusAC('succeeded'))
        } else {
            handServerAppError<{ item: TaskType }>(res.data, dispatch)
        }
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

export const updateTaskTС = (todoListID: string, taskId: string, domainModel: UpdateDomainTaskModelType): ThunkCreatorType => async (dispatch: Dispatch<ActionTasksType>, getState: () => AppStateType) => {
    dispatch(setStatusAC("loading"))
    const task = getState().tasks[todoListID].find(t => t.id === taskId)

    const ApiModel: UpdateTaskModelType = {
        deadline: task!.deadline,
        description: task!.description,
        priority: task!.priority,
        startDate: task!.startDate,
        title: task!.title,
        status: task!.status,
        ...domainModel
    }

    try {
        const res = await tasksAPI.updateTask(todoListID + "wd", taskId, ApiModel)
        if (res.data.resultCode === ResultCode.succeeded) {
            dispatch(updateTaskAC(todoListID, taskId, ApiModel))
            dispatch(setStatusAC('succeeded'))
        } else {
            handServerAppError(res.data, dispatch)
        }

    } catch (e) {
        // error netWork
        if (axios.isAxiosError<ErrorType>(e)) {
            console.log(e);
            const error = e.response ? e.response?.data.messages[0].message : e.message
            handleServerNetworkError(dispatch, error)
            return
        }
        const error = (e as Error).message
        handleServerNetworkError(dispatch, error)
    }

}