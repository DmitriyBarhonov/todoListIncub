import axios, { AxiosResponse } from "axios"
import { LoginType } from "../features/login/Login"


// TodoListType--------------------------------------------------

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type CreacteTodoListType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodoListType
    }
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

// TasksType--------------------------------------------------

export enum TaskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}


export enum TaskPriority {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponse = {
    error: null | string
    totalCount: number
    items: Array<TaskType>

}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
}


// result code
export enum ResultCode {
    succeeded = 0,
    error = 1,
    captchaError = 10
}

// AuthType

type UserDate = {
    id: number
    email: string
    login: string
}

// root API
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'api-key': 'f6dfb876-0d96-4dd8-8917-b1444b0af626'
    }
})

// TodoList API--------------------------------------------------
export const todoListsAPI = {
    getTodolists() {
        return instance.get<TodoListType[]>("todo-lists")
    },
    creacteTodolists(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>, AxiosResponse<ResponseType<{ item: TodoListType }>, { title: string }>>("todo-lists", { title })
    },
    deleteTodolists(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTitleTodolists(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, { title })
    },
}

// Tasks API-------------------------------------------------------
export const tasksAPI = {
    getTasks(todoListID: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todoListID}/tasks`)
    },
    creacteTask(todoListID: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>, { title: string }>>(`todo-lists/${todoListID}/tasks`, { title: title })
    },

    deleeteTask(todoListID: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListID}/tasks/${taskId}`)
    },
    updateTask(todoListID: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType>(`todo-lists/${todoListID}/tasks/${taskId}`, model)
    },
}

// Login API-------------------------------------------------------
export const authAPI = {
    login(data: LoginType) {
        return instance.post<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: LoginType }>, { title: string }>>("auth/login", data)
    },
    me() {
        return instance.get<ResponseType<UserDate>>(`auth/me`)
    }
}