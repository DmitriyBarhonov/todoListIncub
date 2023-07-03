import React, { useCallback, useEffect } from 'react';
import './App.css';
import TodoList from './compomets/TodoLists/Todo';
import { v1 } from 'uuid';
import { AddItemForm } from './compomets/input/addItemForm';
import { AddPureTaskAC } from './store/reducers/tasksReducer';
import { TodolistsDomainType, addTodoListsAC, getTodoListTС, creacteTodolistsTС } from './store/reducers/todoListReducer';
import { useAppSelector } from './hook/useSelectorHook';
import { tasksAPI, todoListsAPI } from './api/todolist-api';
import { useTypeDispatch } from './store/store';


const App = React.memo(() => {
    const todolists = useAppSelector((state) => state.todolists)
    const dispatch = useTypeDispatch()

    useEffect(()=>{
       dispatch(getTodoListTС())
    },[dispatch])

    const addTodoLists = useCallback((newTitle: string) => {
        // const newTodoListId = v1()
        // dispatch(addTodoListsAC(newTodoListId, newTitle))
        // dispatch(AddPureTaskAC(newTodoListId))
        dispatch(creacteTodolistsTС(newTitle))
        // dispatch(getTodoListTС())
    }, [dispatch])


    return (
        <>


            <AddItemForm callBack={addTodoLists} />
            <div className="App">
                {todolists.map((el: TodolistsDomainType) => {

                    return (

                        <TodoList
                            key={el.id}
                            todoListID={el.id}
                            filter={el.filter}
                            title={el.title}
                        />
                    )
                })}
            </div>
        </>
    );
})

export default App;
