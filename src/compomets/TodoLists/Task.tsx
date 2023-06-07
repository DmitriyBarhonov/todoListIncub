import "./../../App.css"
import { useDispatch } from "react-redux"
import { changeTaskStatusTaskAC, removeTaskAC } from "../../store/reducers/tasksReducer"
import { SuperCheckBox } from "../Supercheck/SuperChek"
import { EditableSpan } from "../editableSpan/editableSpan"
import { useCallback } from "react"
import React from "react"

type PropsTaskType = {
    todoListID: string
    id: string
    isDone: boolean
    title: string
    updateTaskHandler:(taskId: string, title: string)=> void
}


export const Task = React.memo( (props: PropsTaskType) => {
    const taskClasses = props.isDone ? "task_not_is_done" : "task"
    const dispatch = useDispatch()

    const updateTitleTask = useCallback((title: string) => {
        props.updateTaskHandler(props.id, title);
    }, [props.updateTaskHandler, props.id]);

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(props.todoListID, props.id));
    }, [dispatch, props.todoListID, props.id]);
    
    const changeTaskStatus = useCallback((e:boolean) => {
        dispatch(changeTaskStatusTaskAC(props.todoListID, props.id, e))
    }, [dispatch, props.todoListID, props.id]);


    return (
        <li className={taskClasses} >
            <SuperCheckBox callBack={changeTaskStatus } checked={props.isDone} />
            <EditableSpan callBack={updateTitleTask} oldTitle={props.title} />
            <button onClick={removeTask}>X</button>
        </li>
    )
})