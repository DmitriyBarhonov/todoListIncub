// import './App.css';
import React, { FC, useCallback, useEffect } from 'react';
import { AddItemForm } from '../compomets/input/addItemForm';
import { EditableSpan } from '../compomets/editableSpan/editableSpan';
import Button from '@mui/material/Button';
import { FliterValuesType, changeFilterAC, deleteTodolistsTС, updateTitleTodolistsTС,} from '../store/reducers/todoListReducer';
import { useAppSelector } from '../hook/useSelectorHook';
import {  creacteTaskTС, deleteAllTasksTaskAC, setTasksTС, updateTaskTitleAC } from '../store/reducers/tasksReducer';
import { Task } from './Task';
import { TaskStatus } from '../api/todolist-api';
import { useTypeDispatch } from '../store/store';


type TodoListPropsType = {
    title: string
    filter: any
    todoListID: string
}



const TodoList: FC<TodoListPropsType> = React.memo((props) => {
    let tasks = useAppSelector((state) => state.tasks[props.todoListID])
    const dispatch = useTypeDispatch()

  useEffect(()=>{
    dispatch(setTasksTС(props.todoListID))
  },[props.todoListID, dispatch])

    if (props.filter === 'active') {
        tasks = tasks.filter(t => t.status === TaskStatus.New)
    }
    if (props.filter === "completed") { 
        tasks = tasks.filter(t => t.status === TaskStatus.Completed)
    }
    if (props.filter === "firstThre") {
        tasks = tasks.slice(0, 3)
    }

    // TodoListCallBack----------------------------
    const deleteTodoListHandler = useCallback(() => {
        // dispatch(deleteAllTasksTaskAC(props.todoListID));
        dispatch(deleteTodolistsTС(props.todoListID))
    }, [dispatch, props.todoListID]);

    const updateTodoListTitleHandler = useCallback((title: string) => {
        dispatch(updateTitleTodolistsTС(props.todoListID, title))
    }, [dispatch, props.todoListID])

// TaskCallBack----------------------------
    const changeFilter = useCallback((todoListID: string, filter: FliterValuesType) => () => {
        dispatch(changeFilterAC(todoListID, filter));
    }, [dispatch]);

    const updateTitleTaskHandler = useCallback((taskId: string, title: string) => {
        dispatch(updateTaskTitleAC(props.todoListID, taskId, title));
    }, [dispatch, props.todoListID]);

  
    const deleteAllTasksHandler = useCallback(() => {
        dispatch(deleteAllTasksTaskAC(props.todoListID));
    }, [dispatch, props.todoListID]);

    const addTaskHandler = useCallback((title: string) => {
        dispatch(creacteTaskTС(props.todoListID, title))
    }, [dispatch, props.todoListID])



    return (
        <>

            <div className="todo">
                <h3>
                    <EditableSpan oldTitle={props.title} callBack={updateTodoListTitleHandler} />
                </h3>
                <Button variant="contained" onClick={deleteTodoListHandler}>Delete Todo List</Button>
                <div>
                    <AddItemForm callBack={addTaskHandler} />
                </div>

                <ul>
                    {tasks?.map((t) => {
                        return <Task todoListID={props.todoListID} key={t.id} id={t.id}
                            status={t.status}
                            title={t.title}
                            updateTitleTaskHandler={updateTitleTaskHandler}
                        />
                    })}
                </ul>

                <div>
                    <div><button onClick={deleteAllTasksHandler}>Delete All</button></div>
                    <button className={props.filter === "all" ? "filter_btn_active" : ""} onClick={changeFilter(props.todoListID, "all")}>All</button>
                    <button className={props.filter === "active" ? "filter_btn_active" : ""} onClick={changeFilter(props.todoListID, "active")}>Active</button>
                    <button className={props.filter === "completed" ? "filter_btn_active" : ""} onClick={changeFilter(props.todoListID, "completed")}>Completed</button>
                    <button className={props.filter === "firstThre" ? "filter_btn_active" : ""} onClick={changeFilter(props.todoListID, "firstThre")}>First thre tasks</button>
                </div>
            </div>
        </>
    )
})

export default TodoList