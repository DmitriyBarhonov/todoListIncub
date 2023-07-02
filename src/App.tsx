import React, { useCallback, useEffect } from 'react';
import './App.css';
import TodoList from './compomets/TodoLists/Todo';
import { v1 } from 'uuid';
import { AddItemForm } from './compomets/input/addItemForm';
import { AddPureTaskAC } from './store/reducers/tasksReducer';
import { TodolistsDomainType, addTodoListsAC, getTodoListTС } from './store/reducers/todoListReducer';
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
        const newTodoListId = v1()
        dispatch(addTodoListsAC(newTodoListId, newTitle))
        dispatch(AddPureTaskAC(newTodoListId))
    }, [dispatch])



    const a = () => {
        todoListsAPI.getTodolists()
            .then((data) => {
                console.log(data);
            })
    }
    const b = () => {
        todoListsAPI.creacteTodolists()
            .then((data) => {
                console.log(data);
            })
    }


    const i = () => {
        todoListsAPI.updateTitleTodolists("0fa39d11-bfbf-4823-a213-b6057c608d93")
            .then((data) => {
                console.log(data);
            })
    }

    const d = () => {
        todoListsAPI.deleteTodolists('d8cd0014-9671-4e15-9bb4-217fb07fa536')
            .then((data) => {
                console.log(data);
            })
    }

    const c = () => {
        tasksAPI.getTasks('d3bed191-9be2-4dce-8d71-c1722e3e2cf9')
            .then((data) => {
                console.log(data.data);
            })
    }

    const go = () => {
        tasksAPI.creacteTask('31462598-a12a-4855-94cc-20af9dfd7db3', "gbol2")
            .then((data) => {
                console.log(data.data);
            })
    }
    const go2 = () => {
        tasksAPI.getTasks('d4be8344-2bee-41a0-b0f8-0fadf19b0ed6')
            .then((data) => {
                console.log(data.data);
            })
    }

    return (
        <>

            <button onClick={a}>get</button>
            <button onClick={b}>creacte</button>
            <button onClick={d}>delete</button>
            <button onClick={i}>update</button>
            <button onClick={c}>get Tasks</button>
            <button onClick={go}>go</button>
            <button onClick={go2}>go2</button>

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
