import React, { useState } from 'react';
import './App.css';
import TodoList from './todo';
import { TaskType } from './todo';

import { v1 } from 'uuid';
export type FliterValuesType = 'all' | 'active' | 'completed' | 'firstThre'
type todoLists = {
    [key: string]: 
}

function App() {
    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        { id: v1(), title: 'What to learn', filter: 'active' },
        { id: v1(), title: 'What to buy', filter: 'all' },
    ])


    const title1: string = "What to learn1"
    // const [tasks_1, setTasks] = useState<Array<TaskType>>([
    //     { id: v1(), title: "HTML&CSS", isDone: true, },
    //     { id: v1(), title: "JS", isDone: false, },
    //     { id: v1(), title: "React", isDone: false, },
    //     { id: v1(), title: "PHP", isDone: false, },
    //     { id: v1(), title: "Angular", isDone: false, },
    //     { id: v1(), title: "React", isDone: false, },
    //     { id: v1(), title: "PHP", isDone: false, },
    //     { id: v1(), title: "Angular", isDone: false, }
    // ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    // const [filter, setFilter] = useState<FliterValuesType>("all")

    const changeFilter = (newFilterValue: FliterValuesType) => {
        // setFilter(newFilterValue)
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
                return tasksList.filter(t => t.isDone === false)
            case "completed":
                return tasksList.filter(t => t.isDone === true)
            case "firstThre":
                return tasksList.slice(0, 3)
            default:
                return tasksList
        }
    }

    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        setTasks(tasks_1.map(t => t.id === taskId ? { ...t, isDone: newIsDoneValue } : t))
    }
// let filter = `filter`
    const newTasksFilter = taksWhatIWantToSee(tasks_1, filter)

    type todolistsType = { id: string, title: string, filter: FliterValuesType }


  


    return (
        <div className="App">
            {todolists.map((el) => {
                return (

                    <TodoList 
                    key={el.id}
                    filter={el.filter}
                        changeTaskStatus={changeTaskStatus}
                        addTask={addTask}
                        deleteAllTasks={deleteAllTasks}
                        changeFilter={changeFilter}
                        removeTask={removeTask}
                        tasks={newTasksFilter}
                        title={title1} />
                )
            })}
        </div>
    );
}

export default App;
