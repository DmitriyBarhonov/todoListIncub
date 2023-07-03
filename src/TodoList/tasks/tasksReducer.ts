import { AppStateType, ThunkCreatorType } from '../../app/store';
import { TaskStatus, TaskType, UpdateTaskModelType, tasksAPI } from '../../api/todolist-api';
import { SetTodoListsACType } from '../todolists/todoListReducer';

export type AssocTaskType = {
    [key: string]: TaskType[]
}

const initialState: AssocTaskType = {}
export type ActionTasksType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskTaskAC>
    | ReturnType<typeof changeTaskStatusTaskAC>
    | ReturnType<typeof deleteAllTasksTaskAC>
    | ReturnType<typeof updateTaskTitleAC>
    | AddPureTaskACType
    | SetTodoListsACType
    | ReturnType<typeof SetTaskAC>

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

        case "CHANGE-STATUS":
            return {
                ...state, [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskId ?
                    { ...el, status: action.payload.status } : el)
            }

        case "DELETE-ALL":
            return { ...state, [action.payload.todoListID]: [] }


        case "UPDATE-TASK-TITLE":
            return {
                ...state, [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskId ?
                    { ...el, title: action.payload.title } : el)
            }
        default:
            return state
    }
}

// Actions-------------------------------------------------------------------
type AddPureTaskACType = ReturnType<typeof AddPureTaskAC>
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

export const changeTaskStatusTaskAC = (todoListID: string, taskId: string, status: TaskStatus) => {
    return {
        type: "CHANGE-STATUS",
        payload: {
            todoListID,
            taskId,
            status,
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
export const setTasksTС = (todoListID: string):ThunkCreatorType => (dispatch ) => {
    tasksAPI.getTasks(todoListID)
        .then((data) => {
            dispatch(SetTaskAC(data.data.items, todoListID))
        })
}

export const deleteTaskTС = (todoListID: string, taskID: string):ThunkCreatorType => (dispatch ) => {
    tasksAPI.deleeteTask(todoListID, taskID)
        .then(() => {
            dispatch(removeTaskAC(todoListID, taskID))
        })
}

export const creacteTaskTС = (todoListID: string, title: string):ThunkCreatorType => (dispatch ) => {
    tasksAPI.creacteTask(todoListID, title)
        .then((res) => {
            dispatch(addTaskTaskAC(res.data.data.item))
        })
}

export const changeStatusTaskTС = (todoListID: string, taskId: string, status: TaskStatus): ThunkCreatorType => (dispatch, getState: () => AppStateType) => {
    const task = getState().tasks[todoListID].find((t) => t.id === taskId)
    const model: UpdateTaskModelType = {
        title: task!.title,
        description: task!.description,
        completed: task!.completed,
        status,
        priority: task!.priority,
        startDate: task!.startDate,
        deadline: task!.deadline,
    }

    tasksAPI.updateTask(todoListID, taskId, model)
        .then((res) => {
            dispatch(changeTaskStatusTaskAC(todoListID, taskId, status))
        })
}