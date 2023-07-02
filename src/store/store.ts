import { todoListReducer } from './../store/reducers/todoListReducer';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { tasksReducer } from "./reducers/tasksReducer";
import  thunkMiddleware, { ThunkDispatch } from "redux-thunk"
import { useDispatch } from 'react-redux';




export type RootReducersType = ReturnType<typeof RootReducers>

export type AppDispatchType = ThunkDispatch<RootReducersType, any, AnyAction>

export type StateType = ReturnType<typeof store.getState>

let RootReducers  = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer
})

export const useTypeDispatch = ()=> useDispatch<AppDispatchType>()

export const store = createStore(RootReducers, applyMiddleware(thunkMiddleware))

