import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppSelector } from '../../hook/useSelectorHook';
import { useTypeDispatch } from '../../app/store';
import { setErrorAC } from '../../app/appReducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {
   const error = useAppSelector<string | null>(state=> state.app.error)
    const dispatch = useTypeDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorAC(null))
    };

    return (
        <>
            <Snackbar open={!!error} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                     {error}
                </Alert>
            </Snackbar>
        </>
    );
}