import { ActionTodoLitsType, todoListReducer } from '../features/TodoList/todolists/todoListReducer';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { ActionTasksType, tasksReducer } from "../features/TodoList/tasks/tasksReducer";
import  thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk"
import { useDispatch } from 'react-redux';
import { appReducer } from './appReducer';




export type RootReducersType = ReturnType<typeof RootReducers>

export type AppDispatchType = ThunkDispatch<RootReducersType, any, AnyAction>

export type AppStateType = ReturnType<typeof store.getState>

export type AppActionsType = ActionTodoLitsType | ActionTasksType 
export type ThunkCreatorType = ThunkAction<void, AppStateType, unknown, AppActionsType>

let RootReducers  = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer,
    app: appReducer
})

export const useTypeDispatch = ()=> useDispatch<AppDispatchType>()

export const store = createStore(RootReducers, applyMiddleware(thunkMiddleware))

