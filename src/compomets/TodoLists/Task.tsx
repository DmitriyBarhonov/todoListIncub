import "./../../App.css"

import { changeStatusTaskTС, changeTaskStatusTaskAC, deleteTaskTС } from "../../store/reducers/tasksReducer"
import { SuperCheckBox } from "../Supercheck/SuperChek"
import { EditableSpan } from "../editableSpan/editableSpan"
import { FC, useCallback } from "react"
import React from "react"
import { TaskStatus } from "../../api/todolist-api"
import { useTypeDispatch } from "../../store/store"

type PropsTaskType = {
    todoListID: string
    id: string
    status: any
    title: string
    updateTitleTaskHandler: (taskId: string, title: string) => void
}


export const Task: FC<PropsTaskType> = React.memo(({ id, status, title, todoListID, updateTitleTaskHandler }) => {
    const taskClasses = status ? "task_not_is_done" : "task"
    const dispatch = useTypeDispatch()

    const updateTitleTask = useCallback((title: string) => {
        updateTitleTaskHandler(id, title);
    }, [updateTitleTaskHandler, id]);

    const removeTask = useCallback(() => {
        dispatch(deleteTaskTС(todoListID, id));
    }, [dispatch, todoListID, id]);

    const changeTaskStatus = useCallback((e: boolean) => {
        const newStatus = e ? TaskStatus.Completed : TaskStatus.New
        dispatch(changeStatusTaskTС(todoListID, id, newStatus))
    }, [dispatch, todoListID, id]);


    return (
        <li className={taskClasses} >
            <SuperCheckBox callBack={changeTaskStatus} checked={status} />
            <EditableSpan callBack={updateTitleTask} oldTitle={title} />
            <button onClick={removeTask}>X</button>
        </li>
    )
})