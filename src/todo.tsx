import { JsxElement } from 'typescript';
import './App.css';
import { FC, useState } from 'react';
import { FliterValuesType } from './App';
import { v1 } from 'uuid';
import { ChangeEvent, KeyboardEvent } from 'react';


type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filterValue: FliterValuesType) => void
    deleteAllTasks: () => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, newIsDoneValue: boolean) => void
    filter: any
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
        if(trimedTitle) props.addTask(title)
        setTitle('')
    }
    const titleMaxLength = 25
    const istitleLengthTooLong: boolean = title.length > titleMaxLength
    const isAddBtnDisabled: boolean = title.length === 0 || title.length > titleMaxLength
    const handlerCreactor = (filter: FliterValuesType) => () => props.changeFilter(filter)
    const AddTaskOnKey = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isAddBtnDisabled && tasckHeandler()
   


    const tasksJSXElement: Array<JSX.Element> = props.tasks.map((t: TaskType, index): JSX.Element => {
        const removeTask = () => props.removeTask(t.id)
        const taskClasses = t.isDone ? "task_not_is_done" : "task"
        const changeTasks = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
        }
        return (
            <li className={taskClasses} key={index}>
                <input onChange={changeTasks} type="checkbox" checked={t.isDone} />
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })




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
                    <div><button onClick={props.deleteAllTasks}>Delete All</button></div>
                    <button className={props.filter === "all" ? "filter_btn_active" : ""} onClick={handlerCreactor("all")}>All</button>
                    <button className={props.filter === "active" ? "filter_btn_active" : ""} onClick={handlerCreactor("active")}>Active</button>
                    <button className={props.filter === "completed" ? "filter_btn_active" : ""} onClick={handlerCreactor("completed")}>Completed</button>
                    <button className={props.filter === "firstThre" ? "filter_btn_active" : ""} onClick={handlerCreactor("firstThre")}>First thre tasks</button>
                </div>
            </div>
        </>
    )
}

export default TodoList