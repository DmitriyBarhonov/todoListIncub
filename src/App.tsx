import React, { useState } from 'react';
import './App.css';
import TodoList from './todo';
import { TaskType } from './todo';

function App() {
    const title1: string = "What to learn1"
    const title2: string = "What to learn2"
const[tasks_1, setTasks] = useState( [
    { id: 1, title: "HTML&CSS", isDone: true, },
    { id: 2, title: "JS", isDone: false,},
    { id: 4, title: "React", isDone: false, },
    { id: 5, title: "PHP", isDone: false,},
    { id: 6, title: "Angular", isDone: false, }
])
    // const tasks_1: Array<TaskType> =

    const tasks_2: Array<TaskType> = [
        { id: 4, title: "BREAD", isDone: true },
    ]

    const removeTask = (taskId : number)=>{
        setTasks(tasks_1.filter(t=> t.id !== taskId))
    }




    return (
        <div className="App">
            <TodoList removeTask={removeTask} tasks={tasks_1} title={title1} />
            {/* <TodoList tasks={tasks_2} title={title2} /> */}
        </div>
    );
}

export default App;
