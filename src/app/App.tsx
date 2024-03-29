import React, { useEffect } from 'react';
import './App.css';
import { useAppSelector } from '../hook/useSelectorHook';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import { RequestStatusType } from './appReducer';
import { ErrorSnackbar } from '../compomets/errorSnackbar/errorSnackbar';
import { Login } from "../features/login/Login"
import { Navigate, Route, Routes } from 'react-router-dom';
import { TodolistsList } from '../features/TodoList/TodolistsList';
import { useTypeDispatch } from './store';
import { logOutTC, meAuthTC } from '../features/login/authReducer';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';




const App = React.memo(() => {
    const statusLoad = useAppSelector<RequestStatusType>(state => state.app.status)
    const iInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const dispatch = useTypeDispatch()


    useEffect(() => {
        dispatch(meAuthTC())

    }, [dispatch])


    if (!iInitialized) {
        return <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
            <CircularProgress />
        </div>
    }

    const logOutHandler = () => {
        dispatch(logOutTC())
    }

    return (
        <>
            {isLoggedIn && <Button onClick={logOutHandler} variant="contained" >Log out</Button>}
            {statusLoad === "loading" && <LinearProgress color="secondary" />}
            <div className="App">

                <ErrorSnackbar />
                <Routes>
                    <Route path={"/"} element={<TodolistsList />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/404"} element={<h1>Error 404</h1>} />
                    <Route path={"*"} element={<Navigate to={'404'} />} />
                </Routes>

            </div>
        </>
    );
})

export default App;
