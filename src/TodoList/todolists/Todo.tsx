// import './App.css';
import React, { FC, useCallback, useEffect } from 'react';
import { AddItemForm } from '../../compomets/input/addItemForm';
import { EditableSpan } from '../../compomets/editableSpan/editableSpan';
import Button from '@mui/material/Button';
import { FliterValuesType, changeFilterAC, deleteTodolistsTС, updateTitleTodolistsTС, } from '../../TodoList/todolists/todoListReducer';
import { useAppSelector } from '../../hook/useSelectorHook';
import { addTaskTС, updateTaskTС, deleteAllTasksTaskAC, setTasksTС } from '../../TodoList/tasks/tasksReducer';
import { Task } from '../tasks/Task';
import { TaskStatus } from '../../api/todolist-api';
import { useTypeDispatch } from '../../app/store';
import { RequestStatusType } from '../../app/appReducer';


type TodoListPropsType = {
    title: string
    filter: any
    todoListID: string
    entityStatus: RequestStatusType
}



const TodoList: FC<TodoListPropsType> = React.memo((props) => {
    let tasks = useAppSelector((state) => state.tasks[props.todoListID])
    const dispatch = useTypeDispatch()

    useEffect(() => {
        dispatch(setTasksTС(props.todoListID))
    }, [props.todoListID, dispatch])

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
    const deleteTodoList = useCallback(() => {

        dispatch(deleteTodolistsTС(props.todoListID))
    }, [dispatch, props.todoListID]);

    const updateTodoListTitle = useCallback((title: string) => {
        dispatch(updateTitleTodolistsTС(props.todoListID, title))
    }, [dispatch, props.todoListID])

    // TaskCallBack----------------------------
    const changeFilter = useCallback((todoListID: string, filter: FliterValuesType) => () => {
        dispatch(changeFilterAC(todoListID, filter));
    }, [dispatch]);

    const updateTitleTask = useCallback((taskId: string, title: string) => {
        dispatch(updateTaskTС(props.todoListID, taskId, {title}));
    }, [dispatch, props.todoListID]);


    const deleteAllTasks = useCallback(() => {
        dispatch(deleteAllTasksTaskAC(props.todoListID));
    }, [dispatch, props.todoListID]);

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTС(props.todoListID, title))
    }, [dispatch, props.todoListID])



    return (
        <>

            <div className="todo">
                <h3>
                    <EditableSpan oldTitle={props.title} callBack={updateTodoListTitle} />
                </h3>
                <Button disabled={props.entityStatus === 'loading'} variant="contained" onClick={deleteTodoList}>Delete Todo List</Button>
                <div>
                    <AddItemForm disabled={props.entityStatus === 'loading'} callBack={addTask} />
                </div>

                <ul>
                    {tasks?.map((t) => {
                        return <Task todoListID={props.todoListID} key={t.id} id={t.id}
                            status={t.status}
                            title={t.title}
                            updateTitleTask={updateTitleTask}
                            entityStatus={props.entityStatus}
                        />
                    })}
                </ul>

                <div>
                    <div><button onClick={deleteAllTasks}>Delete All</button></div>
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