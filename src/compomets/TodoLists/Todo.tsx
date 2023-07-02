// import './App.css';
import React, { FC, useCallback } from 'react';
import { AddItemForm } from '../input/addItemForm';
import { EditableSpan } from '../editableSpan/editableSpan';
import Button from '@mui/material/Button';
import { FliterValuesType, changeFilterAC, deleteTodoListAC, updateTodoListTitleAC } from '../../store/reducers/todoListReducer';
import { useAppSelector } from '../../hook/useSelectorHook';
import { useDispatch } from 'react-redux';
import { addTaskTaskAC, deleteAllTasksTaskAC, updateTaskTitleAC } from '../../store/reducers/tasksReducer';
import { v1 } from 'uuid';
import { Task } from './Task';
import { TaskStatus } from '../../api/todolist-api';


type TodoListPropsType = {
    title: string
    filter: any
    todoListID: string
}



const TodoList: FC<TodoListPropsType> = React.memo((props) => {
    let tasks = useAppSelector((state) => state.tasks[props.todoListID])
    const dispatch = useDispatch()

  

    if (props.filter === 'active') {
        tasks = tasks.filter(t => t.status === TaskStatus.New)
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.status === TaskStatus.Completed)
    }
    if (props.filter === "firstThre") {
        tasks = tasks.slice(0, 3)
    }

    const changeFilter = useCallback((todoListID: string, filter: FliterValuesType) => () => {
        dispatch(changeFilterAC(todoListID, filter));
    }, [dispatch]);

    const updateTaskHandler = useCallback((taskId: string, title: string) => {
        dispatch(updateTaskTitleAC(props.todoListID, taskId, title));
    }, [dispatch, props.todoListID]);

    const deleteTodoListHandler = useCallback(() => {
        dispatch(deleteTodoListAC(props.todoListID));
        dispatch(deleteAllTasksTaskAC(props.todoListID));
    }, [dispatch, props.todoListID]);

    const hendlerDeleteAllTasks = useCallback(() => {
        dispatch(deleteAllTasksTaskAC(props.todoListID));
    }, [dispatch, props.todoListID]);

    const addTaskHandler = useCallback((title: string) => {
        const newTasktId = v1()
        dispatch(addTaskTaskAC(props.todoListID, title, newTasktId))
    }, [dispatch, props.todoListID])

    const updateTodoListTitleHandler = useCallback((title: string) => {
        dispatch(updateTodoListTitleAC(props.todoListID, title))
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
                    {tasks.map((t) => {
                        return <Task todoListID={props.todoListID} key={t.id} id={t.id}
                            status={t.status}
                            title={t.title}
                            updateTaskTitle={updateTaskHandler}
                        />
                    })}
                </ul>

                <div>
                    <div><button onClick={hendlerDeleteAllTasks}>Delete All</button></div>
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