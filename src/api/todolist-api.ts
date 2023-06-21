import axios from "axios"



const settings = {
    withCredentials: true,
    headers: {
        'api-key': 'f6dfb876-0d96-4dd8-8917-b1444b0af626'
    }
}

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

type ResponseType<D> = {
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

export const todoListsAPI = {
    getTodolists() {
        return axios.get<Array<TodoListType>>("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
    },
    creacteTodolists() {
        return axios.post<ResponseType<{ item: TodoListType }>>("https://social-network.samuraijs.com/api/1.1/todo-lists", { title: "First Todo" }, settings)
    },
    deleteTodolists(id: string) {
        return axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
    },
    updateTitleTodolists(id: string) {
        return axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, { title: "First title" }, settings)
    },
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return axios.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, settings)
    },
}