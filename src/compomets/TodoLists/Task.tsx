import "./../../App.css"
import { useDispatch } from "react-redux"
import { changeTaskStatusTaskAC, removeTaskAC } from "../../store/reducers/tasksReducer"
import { SuperCheckBox } from "../Supercheck/SuperChek"
import { EditableSpan } from "../editableSpan/editableSpan"
import { FC, useCallback } from "react"
import React from "react"
import { TaskStatus } from "../../api/todolist-api"

type PropsTaskType = {
    todoListID: string
    id: string
    status: any
    title: string
    updateTaskTitle:(taskId: string, title: string)=> void
}


export const Task: FC<PropsTaskType> = React.memo( ({id,status,title,todoListID,updateTaskTitle}) => {
    const taskClasses = status ? "task_not_is_done" : "task"
    const dispatch = useDispatch()

    const updateTitleTask = useCallback((title: string) => {
        updateTaskTitle(id, title);
    }, [updateTaskTitle, id]);

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(todoListID, id));
    }, [dispatch, todoListID, id]);
    
    const changeTaskStatus = useCallback((e: boolean) => {
        const newStatus = e ? TaskStatus.Completed : TaskStatus.New
        dispatch(changeTaskStatusTaskAC(todoListID, id, newStatus))
    }, [dispatch, todoListID, id]);


    return (
        <li className={taskClasses} >
            <SuperCheckBox callBack={changeTaskStatus } checked={status} />
            <EditableSpan callBack={updateTitleTask} oldTitle={title} />
            <button onClick={removeTask}>X</button>
        </li>
    )
})