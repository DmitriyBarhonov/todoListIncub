import { useCallback, useEffect } from "react"
import { useTypeDispatch } from "../../app/store"
import { useAppSelector } from "../../hook/useSelectorHook"
import { TodolistsDomainType, creacteTodolistsTС, getTodoListTС } from "./todolists/todoListReducer"
import TodoList from "./todolists/Todo"
import { AddItemForm } from "../../compomets/input/addItemForm"
import { Navigate } from "react-router-dom"
import "../../app/App.css"

export const TodolistsList = () => {
    const todolists = useAppSelector((state) => state.todolists)
    const dispatch = useTypeDispatch()
    const isLoggenIn = useAppSelector(state => state.auth.isLoggedIn)
    useEffect(() => {
        if (!isLoggenIn) return
        dispatch(getTodoListTС())
    }, [dispatch])

    const addTodoLists = useCallback((newTitle: string) => {
        dispatch(creacteTodolistsTС(newTitle))
    }, [dispatch])

    if (!isLoggenIn) return <Navigate to={"/login"} />

    return (
        <div >
            <AddItemForm callBack={addTodoLists} />
            <div className="todolist_wrapper">
                {todolists.map((el: TodolistsDomainType) => {
                    return (
                        <TodoList
                            key={el.id}
                            todoListID={el.id}
                            filter={el.filter}
                            title={el.title}
                            entityStatus={el.entityStatus}
                        />
                    )
                })}
            </div>

        </div>
    )

}
