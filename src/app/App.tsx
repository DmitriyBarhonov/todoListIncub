import React from 'react';
import './App.css';
import { useAppSelector } from '../hook/useSelectorHook';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import { RequestStatusType } from './appReducer';
import { ErrorSnackbar } from '../compomets/errorSnackbar/errorSnackbar';
import { Login } from "../features/login/Login"
import { Navigate, Route, Routes } from 'react-router-dom';
import { TodolistsList } from '../features/TodoList/TodolistsList';



const App = React.memo(() => {
    const statusLoad = useAppSelector<RequestStatusType>(state => state.app.status)
    return (
        <>
            {statusLoad === "loading" && <LinearProgress color="secondary" />}
            <div className="App">

                <ErrorSnackbar />
                <Routes>
                    <Route path={"/"} element={<TodolistsList />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/404"} element={<h1>Error 404</h1>} />
                    <Route path={"*"} element={<Navigate to={'404'}/> } />
                </Routes>

            </div>
        </>
    );
})

export default App;
