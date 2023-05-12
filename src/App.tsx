import React, { useReducer, useState } from 'react';
import './App.css';
import TodoList from './todo';
import { TaskType } from './todo';
import { v1 } from 'uuid';
import { AddItemForm } from './compomets/input/addItemForm';
import { AddPureTaskAC, addTaskTaskAC, changeTaskStatusTaskAC, deleteAllTasksTaskAC, removeTaskAC, tasksReducer, updateTaskAC } from './compomets/reducers/tasksReducer';
import { addTodoListsAC, changeFilterAC, todoListReducer, updateTodoListTitleAC } from './compomets/reducers/todoListReducer';



export type FliterValuesType = 'all' | 'active' | 'completed' | 'firstThre'
export type TodolistsType = { id: string, title: string, filter: FliterValuesType }

export type AssocTaskType = {
    [key: string]: TaskType[]
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()



    const [todolists, dispatchTodolists] = useReducer(todoListReducer, [
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
        dispatchTodolists(changeFilterAC(todoListID,newFilterValue))
    }

    const removeTask = (todoListID: string, taskId: string) => {
        dispatchTasks(removeTaskAC(todoListID, taskId))
    }

    const deleteAllTasks = (todoListID: string) => {
         dispatchTasks(deleteAllTasksTaskAC(todoListID))
    }

    const addTask = (todoListID: string, title: string) => {

        const newTask: TaskType = {
            id: v1(),
             title,
            isDone: false,
        }
          dispatchTasks(addTaskTaskAC(todoListID,newTask))
    }



    const changeTaskStatus = (todoListID: string, taskId: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusTaskAC(todoListID,taskId,isDone))
    }

    const addTodoLists = (newTitle: string) => {
        const newTodoListId = v1()
        const newTodoListItem: TodolistsType = { id: newTodoListId, title: newTitle, filter: 'all' }
        dispatchTodolists( addTodoListsAC(newTodoListItem))
        dispatchTasks(AddPureTaskAC(newTodoListId))
    }


    const updateTask = (todoListID: string, taskId: string, title: string) => {
        dispatchTasks(updateTaskAC(todoListID, taskId, title))
        console.log(tasks);
        
    }

    const updateTodoListTitle = (todoListID: string, title: string) => {
        dispatchTodolists(updateTodoListTitleAC(todoListID,title,))
    }

    return (
        <div className="App">
            <AddItemForm callBack={addTodoLists} />
            {todolists.map((el:TodolistsType) => {

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
                        title={el.title}
                        updateTask={updateTask}
                        updateTodoListTitle={updateTodoListTitle}
                    />

                )
            })}
        </div>
    );
}

export default App;
