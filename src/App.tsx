import React, { useCallback, useEffect } from 'react';
import './App.css';
import TodoList from './TodoLists/Todo';
import { AddItemForm } from './compomets/input/addItemForm';
import { TodolistsDomainType, getTodoListTС, creacteTodolistsTС } from './store/reducers/todoListReducer';
import { useAppSelector } from './hook/useSelectorHook';
import { useTypeDispatch } from './store/store';


const App = React.memo(() => {
    const todolists = useAppSelector((state) => state.todolists)
    const dispatch = useTypeDispatch()

    useEffect(() => {
        dispatch(getTodoListTС())
    }, [dispatch])

    const addTodoLists = useCallback((newTitle: string) => {
        dispatch(creacteTodolistsTС(newTitle))
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
