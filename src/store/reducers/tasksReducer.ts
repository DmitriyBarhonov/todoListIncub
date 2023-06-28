
import { TaskPriority, TaskStatus, TaskType } from '../../api/todolist-api';
import { todolistID1, todolistID2 } from './todoListReducer';
import { v1 } from 'uuid';

export type AssocTaskType = {
    [key: string]: TaskType[]
}

const initialState: AssocTaskType = {
    [todolistID1]: [
        {
            id: v1(),
            title: "HTML&CSS",
            status: TaskStatus.Completed,
            todoListId: todolistID1,
            description: "",
            startDate: '',
            deadline: "",
            addedDate: "",
            priority: TaskPriority.Low,
            completed: false,
            order: 0
        },

    ],
    [todolistID2]: [
        {
            id: v1(),
            title: "JS",
            status: TaskStatus.New,
            todoListId: todolistID2,
            description: "",
            startDate: '',
            deadline: "",
            addedDate: "",
            priority: TaskPriority.Low,
            completed: false,
            order: 0
        },

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
                status: TaskStatus.New,
                todoListId: todolistID1,
                description: "",
                startDate: '',
                deadline: "",
                addedDate: "",
                priority: TaskPriority.Low,
                completed: false,
                order: 0
            }
            return { ...state, [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]] }

        case "ADD-PURE-TASK":
            return { ...state, [action.payload.todoListID]: [] }

        case "CHANGE-STATUS":
            // debugger
            return { ...state, [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskId ? { ...el, status: action.payload.status } : el) }

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