import { JsxElement } from 'typescript';
import './App.css';
import { FC, useState } from 'react';
import { FliterValuesType } from './App';
import { v1 } from 'uuid';
import { ChangeEvent, KeyboardEvent } from 'react';


type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (todoListID: string, taskId: string) => void
    changeFilter: (todoListID: string, filterValue: FliterValuesType) => void
    deleteAllTasks: (todoListID: string) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string,id: string, newIsDoneValue: boolean) => void
    filter: any
    todoListID: string
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}




const TodoList: FC<TodoListPropsType> = (props) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    const setTitleHeadler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        console.log(title)
    }

    const tasckHeandler = () => {
        const trimedTitle = title.trim()
        if(trimedTitle) props.addTask(props.todoListID,title)
        setTitle('')
    }
    const titleMaxLength = 25
    const istitleLengthTooLong: boolean = title.length > titleMaxLength
    const isAddBtnDisabled: boolean = title.length === 0 || title.length > titleMaxLength
    const handlerCreactor = (todoListID: string, filter: FliterValuesType) => () =>  {
       
        props.changeFilter(todoListID,filter)
    }
    const AddTaskOnKey = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isAddBtnDisabled && tasckHeandler()
   


    const tasksJSXElement: Array<JSX.Element> = props.tasks.map((t: TaskType, index): JSX.Element => {
        const removeTask = () => props.removeTask(props.todoListID, t.id)
        const taskClasses = t.isDone ? "task_not_is_done" : "task"
        const changeTasks = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todoListID,t.id, e.currentTarget.checked)
        }
        return (
            <li className={taskClasses} key={index}>
                <input onChange={changeTasks} type="checkbox" checked={t.isDone} />
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

const hendlerDeleteAllTasks = ()=>{
    props.deleteAllTasks(props.todoListID)
}


    return (
        <>

            <div className="todo">
                <h3>{props.title}</h3>
                <div>
                    <input onKeyDown={AddTaskOnKey} placeholder='Max 25 simbols' value={title} onChange={setTitleHeadler} />
                    <button disabled={isAddBtnDisabled} onClick={tasckHeandler}>+</button>
                    {istitleLengthTooLong && <div>Title is too long</div>}
                </div>
                <ul>

                    {tasksJSXElement}
                </ul>

                <div>
                    <div><button onClick={hendlerDeleteAllTasks}>Delete All</button></div>
                    <button className={props.filter === "all" ? "filter_btn_active" : ""} onClick={handlerCreactor(props.todoListID, "all")}>All</button>
                    <button className={props.filter === "active" ? "filter_btn_active" : ""} onClick={handlerCreactor(props.todoListID,"active")}>Active</button>
                    <button className={props.filter === "completed" ? "filter_btn_active" : ""} onClick={handlerCreactor(props.todoListID,"completed")}>Completed</button>
                    <button className={props.filter === "firstThre" ? "filter_btn_active" : ""} onClick={handlerCreactor(props.todoListID,"firstThre")}>First thre tasks</button>
                </div>
            </div>
        </>
    )
}

export default TodoList