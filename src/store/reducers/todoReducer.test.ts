import { AssocTaskType, addTaskTaskAC, changeTaskStatusTaskAC, removeTaskAC, tasksReducer, updateTaskTitleAC } from './tasksReducer';
import { TodolistsType, deleteTodoListAC, todoListReducer } from './todoListReducer';


// 1:33:15

let startsStateTasks: AssocTaskType
let startsStateTodoLists: TodolistsType[] 
beforeEach(() => {
     startsStateTasks = {
        'todolistID1': [
            { id: "1", title: "HTML&CSS", isDone: true },
            { id: "2", title: "JS", isDone: true },

        ],
        'todolistID2': [
            { id: "1", title: "bread", isDone: true },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "juce", isDone: true }
        ]
    }

    startsStateTodoLists= [
        { id: "todolistID1", title: 'What to learn', filter: 'all' },
        { id: "todolistID2", title: 'What to buy', filter: 'all' },
    ]
})


test("correct task should be deteted from correct array", () => {


    const action = removeTaskAC("todolistID2", "2")

    const endState = tasksReducer(startsStateTasks, action)

    expect(endState).toEqual({
        'todolistID1': [
            { id: "1", title: "HTML&CSS", isDone: true },
            { id: "2", title: "JS", isDone: true },

        ],
        'todolistID2': [
            { id: "1", title: "bread", isDone: true },
            { id: "3", title: "juce", isDone: true },
        ]
    })
})


// test("correct task should be added from correct array", () => {


//     const action = addTaskTaskAC("todolistID2", 'govno')
//     const endState = tasksReducer(startsState, action)

//     expect(endState).toEqual({
//         'todolistID1': [
//             { id: "1", title: "HTML&CSS", isDone: true },
//             { id: "2", title: "JS", isDone: true },

//         ],
//         'todolistID2': [
//             { id: "1", title: "govno", isDone: false },
//             { id: "1", title: "bread", isDone: true },
//             { id: "2", title: "milk", isDone: true },
//             { id: "3", title: "juce", isDone: true }

 
//         ]
//     })
    // })

    test(" status status should be changed", () => {
        const action = changeTaskStatusTaskAC("todolistID2", "2", true)
        const endState = tasksReducer(startsStateTasks, action)
        expect(endState.todolistID2[1].isDone).toBe(true)
        expect(endState.todolistID1[1].isDone).toBe(true)

    })

    test(" title should be changed", () => {

        const action = updateTaskTitleAC("todolistID2", "2", 'true')

        const endState = tasksReducer(startsStateTasks, action)

        expect(endState.todolistID2[1].title).toBe('true')

    })


    test(" todoList should be deleted", () => {

        const action = deleteTodoListAC("todolistID2")

        const endState = todoListReducer(startsStateTodoLists, action)

        const keys: string[] = Object.keys(endState)

        expect(endState.find(item => item.id !== "todolistID1")).not.toBeDefined();

    })