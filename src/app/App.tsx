import React, { useCallback, useEffect } from 'react';
import './App.css';
import TodoList from '../TodoList/todolists/Todo';
import { AddItemForm } from '../compomets/input/addItemForm';
import { TodolistsDomainType, getTodoListTС, creacteTodolistsTС } from '../TodoList/todolists/todoListReducer';
import { useAppSelector } from '../hook/useSelectorHook';
import { useTypeDispatch } from './store';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import { RequestStatusType } from './appReducer';
import { ErrorSnackbar } from '../compomets/errorSnackbar/errorSnackbar';


const App = React.memo(() => {
    const todolists = useAppSelector((state) => state.todolists)
    const statusLoad = useAppSelector<RequestStatusType>(state=> state.app.status )
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
            {statusLoad === "loading" && <LinearProgress color="secondary" />}
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
                <ErrorSnackbar/>
            </div>
        </>
    );
})

export default App;
