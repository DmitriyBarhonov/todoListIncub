import "../../app/App.css"
import { updateTaskTС,deleteTaskTС } from "./tasksReducer"
import { SuperCheckBox } from "../../compomets/Supercheck/SuperChek"
import { EditableSpan } from "../../compomets/editableSpan/editableSpan"
import { FC, useCallback } from "react"
import React from "react"
import { TaskStatus } from "../../api/todolist-api"
import { useTypeDispatch } from "../../app/store"
import LinearProgress from "@mui/material/LinearProgress/LinearProgress"

type PropsTaskType = {
    todoListID: string
    id: string
    status: any
    title: string
    updateTitleTask: (taskId: string, title: string) => void
}


export const Task: FC<PropsTaskType> = React.memo(({ id, status, title, todoListID, updateTitleTask }) => {
    const taskClasses = status ? "task_not_is_done" : "task"
    const dispatch = useTypeDispatch()

    const updateTitleTaskHeandler = useCallback((title: string) => {
        updateTitleTask(id, title);
    }, [updateTitleTask, id]);

    const removeTask = useCallback(() => { 
        dispatch(deleteTaskTС(todoListID, id));
    }, [dispatch, todoListID, id]);

    const changeTaskStatus = useCallback((checked: boolean) => {
       
        
        const newStatus = checked ? TaskStatus.Completed : TaskStatus.InProgress
       
        
        dispatch(updateTaskTС(todoListID, id, {status:newStatus}))
    }, [dispatch, todoListID, id]);


    return (
        <li className={taskClasses} >
            <SuperCheckBox callBack={changeTaskStatus} checked={status} />
           
            <EditableSpan callBack={updateTitleTaskHeandler} oldTitle={title} />
            <button onClick={removeTask}>X</button>
        </li>
    )
})