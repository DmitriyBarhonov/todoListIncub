import React, { useCallback } from 'react';
import './App.css';
import TodoList from './compomets/TodoLists/Todo';
import { v1 } from 'uuid';
import { AddItemForm } from './compomets/input/addItemForm';
import { AddPureTaskAC} from './store/reducers/tasksReducer';
import {TodolistsType, addTodoListsAC} from './store/reducers/todoListReducer';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './hook/useSelectorHook';


const App = React.memo( () =>{
    const todolists = useAppSelector((state) => state.todolists)
    const dispatch = useDispatch()

    const addTodoLists = useCallback( (newTitle: string) => {
        const newTodoListId = v1()
        dispatch(addTodoListsAC(newTodoListId, newTitle))
        dispatch(AddPureTaskAC(newTodoListId))
        console.log('wddw');
        
    },[dispatch])
 console.log('App');
    return (
        <>
            <AddItemForm callBack={addTodoLists} />
            <div className="App">
                {todolists.map((el: TodolistsType) => {

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
