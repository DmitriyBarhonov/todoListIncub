import React, { useState } from 'react';
import './App.css';
import TodoList from './todo';
import { TaskType } from './todo';
import { v1 } from 'uuid';
export type FliterValuesType = 'all' | 'active' | 'completed' | 'firstThre'
function App() {
    const title1: string = "What to learn1"
    const [tasks_1, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML&CSS", isDone: true, },
        { id: v1(), title: "JS", isDone: false, },
        { id: v1(), title: "React", isDone: false, },
        { id: v1(), title: "PHP", isDone: false, },
        { id: v1(), title: "Angular", isDone: false, },
        { id: v1(), title: "React", isDone: false, },
        { id: v1(), title: "PHP", isDone: false, },
        { id: v1(), title: "Angular", isDone: false, }
    ])

    const [filter, setFilter] = useState<FliterValuesType>("all")

    const changeFilter = (newFilterValue: FliterValuesType) => {
        setFilter(newFilterValue)
    }

    const removeTask = (taskId: string) => {
        setTasks(tasks_1.filter(t => t.id !== taskId))
    }

    const deleteAllTasks = () => {
        setTasks([])
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(), 
            title: title, 
            isDone: false,
        }
        setTasks([newTask, ...tasks_1])
    }


    const taksWhatIWantToSee = (tasksList: Array<TaskType>, filterValue: FliterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasks_1.filter(t => t.isDone === false)
            case "completed":
                return tasks_1.filter(t => t.isDone === true)
            case "firstThre":
                return tasks_1.slice(0, 3)
            default:
                return tasks_1
        }
    }



    const newTasksFilter = taksWhatIWantToSee(tasks_1, filter)




    return (
        <div className="App">

            <TodoList addTask={addTask} deleteAllTasks={deleteAllTasks} changeFilter={changeFilter} removeTask={removeTask} tasks={newTasksFilter} title={title1} />
        </div>
    );
}

export default App;
