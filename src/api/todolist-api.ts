import axios from "axios"





// TodoListType

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

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

// TasksType

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
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

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'api-key': 'f6dfb876-0d96-4dd8-8917-b1444b0af626'
    }
})


export const todoListsAPI = {
    getTodolists() {
        return instance.get<Array<TodoListType>>("todo-lists")
    },
    creacteTodolists() {
        return instance.post<ResponseType<{ item: TodoListType }>>("todo-lists", { title: "First Todo" })
    },
    deleteTodolists(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTitleTodolists(id: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, { title: "First title" })
    },
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
   deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },

    deleeteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
}