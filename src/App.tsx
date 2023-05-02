import React, { useState } from 'react';
import './App.css';
import TodoList from './todo';
import { TaskType } from './todo';
import { v1 } from 'uuid';
export type FliterValuesType = 'all' | 'active' | 'completed' | 'firstThre'

type todolistsType = { id: string, title: string, filter: FliterValuesType }
type AssocTaskType = {
    [key: string]: TaskType[]
}

function App() {
   let todolistID1 = v1()
   let todolistID2 = v1()


    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])


    let [tasks, setTasks] = useState<AssocTaskType>({
        [todolistID1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: "HTML&CSS2", isDone: true },
            { id: v1(), title: "JS2", isDone: true },
            { id: v1(), title: "ReactJS2", isDone: false },
            { id: v1(), title: "Rest API2", isDone: false },
            { id: v1(), title: "GraphQL2", isDone: false },
        ]
    });

 

    const changeFilter = (todoListID: string, newFilterValue: FliterValuesType) => {
        // setTodolists(todolists.map(el => el.id === todoListID ? { ...el, filter: newFilterValue } : el))
    }

    const removeTask = (todoListID: string, taskId: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== taskId)})
    }

    const deleteAllTasks = (todoListID: string) => {
        setTasks({...tasks, [todoListID]: []})
    }

    const addTask = (todoListID: string, title: string) => {

        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID], ]})
        // setTasks([newTask, ...tasks])
    }



    const changeTaskStatus = (todoListID: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === taskId ? {...el, isDone} : el)})
        // setTasks(tasks.map(el => el.id === taskId ? { ...el, isDone: newIsDoneValue } : el))
    }






    return (
        <div className="App">
            {todolists.map((el) => {

                let tasksForTodoList = tasks[el.id]

                if (el.filter === 'active') {
                    tasksForTodoList = tasks[el.id].filter(t => !t.isDone)
                }
                if (el.filter === "completed") {
                    tasksForTodoList = tasks[el.id].filter(t => t.isDone)
                }
                if (el.filter === "firstThre") {
                    tasksForTodoList = tasks[el.id].slice(0, 3)
                }


                return (

                    <TodoList
                        key={el.id}
                        todoListID={el.id}
                        filter={el.filter}
                        changeTaskStatus={changeTaskStatus}
                        addTask={addTask}
                        deleteAllTasks={deleteAllTasks}
                        changeFilter={changeFilter}
                        removeTask={removeTask}
                        tasks={tasksForTodoList}
                        title={el.title} />
                )
            })}
        </div>
    );
}

export default App;
