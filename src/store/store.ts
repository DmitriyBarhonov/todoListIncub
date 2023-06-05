import { todoListReducer } from './../store/reducers/todoListReducer';
import { combineReducers, legacy_createStore as createStore } from "redux";
import { tasksReducer } from "./reducers/tasksReducer";




export type RootReducersType = ReturnType<typeof RootReducers>

export type StateType = ReturnType<typeof store.getState>

let RootReducers  = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer
})

export const store = createStore(RootReducers)

