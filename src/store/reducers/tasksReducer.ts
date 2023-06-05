import { TaskType } from '../../compomets/TodoLists/Todo';
import { todolistID1, todolistID2 } from './todoListReducer';
import { v1 } from 'uuid';

export type AssocTaskType = {
    [key: string]: TaskType[]
}

const initialState: AssocTaskType  =  {
    [todolistID1]: [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
        { id: v1(), title: "milk", isDone: true },
        { id: v1(), title: "juce", isDone: true },
        { id: v1(), title: "apple", isDone: false },
        { id: v1(), title: "orange", isDone: false },
    ]
}

export const tasksReducer = (state: AssocTaskType = initialState, action: AllAction): AssocTaskType => {

    switch (action.type) {
        case 'REMOVE-TASK':
            return { ...state, [action.payload.todoListID]: state[action.payload.todoListID].filter(el => el.id !== action.payload.taskId) }


        case "ADD-TASK":
            const newTask: TaskType = {
                id: action.payload.newTasktId,
                title: action.payload.title,
                isDone: false,
            }
            return { ...state, [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]] }

        case "ADD-PURE-TASK":
            return { ...state, [action.payload.todoListID]: [] }

        case "CHANGE-STATUS":
            return { ...state, [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskId ? { ...el, isDone: action.payload.isDone } : el) }

        case "DELETE-ALL":
            return { ...state, [action.payload.todoListID]: [] }


        case "UPDATE-TASK-TITLE":
            return { ...state, [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskId ? { ...el, title: action.payload.title } : el) }
        default:
            return state
    }
}

type AllAction = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | DeleteAllTasksACType | UpdateTaskACType | AddPureTaskACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todoListID: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todoListID,
            taskId
        }
    } as const
}
type AddTaskACType = ReturnType<typeof addTaskTaskAC>

export const addTaskTaskAC = (todoListID: string, title: string, newTasktId: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todoListID,
            title,
            newTasktId
        }
    } as const
}
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusTaskAC>

export const changeTaskStatusTaskAC = (todoListID: string, taskId: string, isDone: boolean) => {
    return {
        type: "CHANGE-STATUS",
        payload: {
            todoListID,
            taskId,
            isDone,
        }
    } as const
}
type DeleteAllTasksACType = ReturnType<typeof deleteAllTasksTaskAC>

export const deleteAllTasksTaskAC = (todoListID: string) => {
    return {
        type: "DELETE-ALL",
        payload: {
            todoListID,
        }
    } as const
}

type UpdateTaskACType = ReturnType<typeof updateTaskTitleAC>

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
type AddPureTaskACType = ReturnType<typeof AddPureTaskAC>
export const AddPureTaskAC = (todoListID: string) => {
    return {
        type: "ADD-PURE-TASK",
        payload: {
            todoListID,
        }
    } as const
}