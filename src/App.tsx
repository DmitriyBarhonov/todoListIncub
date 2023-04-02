import React from 'react';
import './App.css';
import TodoList from './todo';
import { TaskType } from './todo';

function App() {
    const title1: string = "What to learn1"
    const title2: string = "What to learn2"

    const tasks_1: Array<TaskType> = [
        { id: 1, title: "HTML&CSS", isDone: true, },
        { id: 2, title: "JS", isDone: false,},
        { id: 3, title: "React", isDone: false, }
    ]

    
    const tasks_2: Array<TaskType> = [
        { id: 4, title: "BREAD", isDone: true },
        { id: 5, title: "WATER", isDone: false },
        { id: 6, title: "SALT", isDone: false },
    ]
    return (
        <div className="App">
            <TodoList tasks={tasks_1} title={title1} />
            <TodoList tasks={tasks_2} title={title2} />
        </div>
    );
}

export default App;
