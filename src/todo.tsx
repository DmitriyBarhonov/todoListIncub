import { JsxElement } from 'typescript';
import './App.css';
import { FC, useState } from 'react';
import { FliterValuesType } from './App';
import { v1 } from 'uuid';
import { ChangeEvent, KeyboardEvent } from 'react';
import { log } from 'console';

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filterValue: FliterValuesType) => void
    deleteAllTasks: () => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}




const TodoList: FC<TodoListPropsType> = (props) => {

    const [title, setTitle] = useState('')

    const setTitleHeadler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        console.log(title)
    }

    const tasckHeandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const titleMaxLength = 25
    const istitleLengthTooLong: boolean = title.length > titleMaxLength
    const isAddBtnDisabled: boolean = title.length === 0 || title.length > titleMaxLength
    const handlerCreactor = (filter: FliterValuesType)=> () => props.changeFilter(filter)
    const AddTaskOnKey = (e: KeyboardEvent<HTMLInputElement>)=> e.key === "Enter" && !isAddBtnDisabled && tasckHeandler()

    const tasksJSXElement: any = props.tasks.map((t: TaskType, index): JSX.Element => {
        return (
            <li key={index}>
                <input type="checkbox" checked={t.isDone} />
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)}>X</button>
            </li>
        )
    })




    return (
        <>

            <div className="todo">
                <h3>{props.title}</h3>
                <div>
                    <input onKeyDown={AddTaskOnKey} placeholder='Max 25 simbols' value={title} onChange={setTitleHeadler} />
                    <button  disabled={isAddBtnDisabled} onClick={tasckHeandler}>+</button>
                    {istitleLengthTooLong && <div>Title is too long</div>}
                </div>
                <ul>

                    {tasksJSXElement}
                </ul>

                <div>
                    <div><button onClick={props.deleteAllTasks}>Delete All</button></div>
                    <button onClick={handlerCreactor("all")}>All</button>
                    <button onClick={handlerCreactor("active")}>Active</button>
                    <button onClick={handlerCreactor("completed")}>Completed</button>
                    <button onClick={handlerCreactor("firstThre")}>First thre tasks</button>
                </div>
            </div>
        </>
    )
}

export default TodoList