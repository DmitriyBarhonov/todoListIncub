import { JsxElement } from 'typescript';
import './App.css';
import { FC } from 'react';
import { FliterValuesType } from './App';


type TodoListPropsType ={
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number)=> void
    changeFilter: (filterValue: FliterValuesType)=> void
}

export type TaskType = {
    id: number
    title: string 
    isDone: boolean

}




const TodoList: FC<TodoListPropsType>= (props) => {

    const tasksJSXElement:any = props.tasks.map((t:TaskType, index): JSX.Element =>{
        return (
            <li key={index}>
                <input type = "checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={()=>props.removeTask(t.id)}>X</button>
            </li>
        )
    })

    // const tasksJSXElements: Array<JSX.Element> = props.tasks.map(tasksJSXElement)


    return (
        <div className="todo">
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>  
            </div>
            <ul>
                {tasksJSXElement}
            </ul>
            <div>
                <button onClick={()=>props.changeFilter("all")}>All</button>
                <button onClick={()=>props.changeFilter("active")}>Active</button>
                <button onClick={()=>props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList