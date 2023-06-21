import axios from "axios"


const settings = {
    withCredentials: true,
    headers: {
        'api-key': 'f6dfb876-0d96-4dd8-8917-b1444b0af626'
    }
}

export const todoListsAPI = {
    getTodolists() {
        return axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
    },
    creacteTodolists() {
        return axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", { title: "First Todo" }, settings)
    },
   deleteTodolists(id: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
    },
    updateTitleTodolists(id: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title: "First title" }, settings)
    },
}