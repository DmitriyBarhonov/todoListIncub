import './App.css';
import { FC } from 'react';
import { FliterValuesType } from './App';
import { ChangeEvent } from 'react';
import { AddItemForm } from './compomets/input/addItemForm';
import { EditableSpan } from './compomets/editableSpan/editableSpan';
 

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (todoListID: string, taskId: string) => void
    changeFilter: (todoListID: string, filterValue: FliterValuesType) => void
    deleteAllTasks: (todoListID: string) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, id: string, newIsDoneValue: boolean) => void
    filter: any
    todoListID: string
    updateTask: (todoListID: string, taskId: string, title: string) => void
    updateTodoListTitle: (todoListID: string, title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}




const TodoList: FC<TodoListPropsType> = (props) => {



    const handlerCreactor = (todoListID: string, filter: FliterValuesType) => () => {
        props.changeFilter(todoListID, filter)
    }

    const updateTaskHandler = (taskId: string, title: string) => {
        props.updateTask(props.todoListID, taskId, title)
    }

    const tasksJSXElement: Array<JSX.Element> = props.tasks?.map((t: TaskType, index): JSX.Element => {
        const removeTask = () => props.removeTask(props.todoListID, t.id)
        const taskClasses = t.isDone ? "task_not_is_done" : "task"
        const changeTasks = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked)
        }

        return (
            <li className={taskClasses} key={index}>
                <input onChange={changeTasks} type="checkbox" checked={t.isDone} />
                <EditableSpan callBack={(title) => updateTaskHandler(t.id, title,)} oldTitle={t.title} />
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

    const hendlerDeleteAllTasks = () => {
        props.deleteAllTasks(props.todoListID)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todoListID, title)
    }
    const updateTodoListTitleHandler = (title: string) => {
        props.updateTodoListTitle(props.todoListID, title)
    }



    return (
        <>

            <div className="todo">
                <h3>
                    <EditableSpan oldTitle={props.title} callBack={updateTodoListTitleHandler} />
                </h3>
                <div>
                    <AddItemForm callBack={addTaskHandler} />
                </div>
                <ul>

                    {tasksJSXElement}
                </ul>

                <div>
                    <div><button onClick={hendlerDeleteAllTasks}>Delete All</button></div>
                    <button className={props.filter === "all" ? "filter_btn_active" : ""} onClick={handlerCreactor(props.todoListID, "all")}>All</button>
                    <button className={props.filter === "active" ? "filter_btn_active" : ""} onClick={handlerCreactor(props.todoListID, "active")}>Active</button>
                    <button className={props.filter === "completed" ? "filter_btn_active" : ""} onClick={handlerCreactor(props.todoListID, "completed")}>Completed</button>
                    <button className={props.filter === "firstThre" ? "filter_btn_active" : ""} onClick={handlerCreactor(props.todoListID, "firstThre")}>First thre tasks</button>
                </div>
            </div>
        </>
    )
}

export default TodoList