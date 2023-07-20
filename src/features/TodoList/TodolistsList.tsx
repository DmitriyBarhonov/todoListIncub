import { useCallback, useEffect } from "react"
import { useTypeDispatch } from "../../app/store"
import { useAppSelector } from "../../hook/useSelectorHook"
import { TodolistsDomainType, creacteTodolistsTС, getTodoListTС } from "./todolists/todoListReducer"
import TodoList from "./todolists/Todo"
import { AddItemForm } from "../../compomets/input/addItemForm"


export const TodolistsList = () => {
    const todolists = useAppSelector((state) => state.todolists)
    const dispatch = useTypeDispatch()

    useEffect(() => {
        dispatch(getTodoListTС())
    }, [dispatch])
    const addTodoLists = useCallback((newTitle: string) => {
        dispatch(creacteTodolistsTС(newTitle))
    }, [dispatch])

    return (
        <div>
            <AddItemForm callBack={addTodoLists} />
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
    )

}
