import React, { useState } from 'react';
import './App.css';
import TodoList from './todo';
import { TaskType } from './todo';

export type FliterValuesType = 'all' | 'active' | 'completed'

function App() {
    const title1: string = "What to learn1"
    const title2: string = "What to learn2"
    const [tasks_1, setTasks] = useState<Array<TaskType>>([
        { id: 1, title: "HTML&CSS", isDone: true, },
        { id: 2, title: "JS", isDone: false, },
        { id: 4, title: "React", isDone: false, },
        { id: 5, title: "PHP", isDone: false, },
        { id: 6, title: "Angular", isDone: false, }
    ])

    const [filter, setFilter] = useState<FliterValuesType>("all")

    const changeFilter = (newFilterValue: FliterValuesType) => {
        setFilter(newFilterValue)
    }

    const removeTask = (taskId: number) => {
        setTasks(tasks_1.filter(t => t.id !== taskId))
    }


    const taksWhatIWantToSee = (tasksList: Array<TaskType>, filterValue: FliterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasks_1.filter(t => t.isDone === false)
            case "completed":
                return tasks_1.filter(t => t.isDone === true)
            default:
                return tasks_1
        }
    }


    const newTasksFilter = taksWhatIWantToSee(tasks_1, filter)




    return (
        <div className="App">
            <TodoList changeFilter={changeFilter} removeTask={removeTask} tasks={newTasksFilter} title={title1} />
            {/* <TodoList tasks={tasks_2} title={title2} /> */}
        </div>
    );
}

export default App;
