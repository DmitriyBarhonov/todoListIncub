
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { useTypeDispatch } from '../../app/store';
import { loginTC } from './authReducer';
import { useAppSelector } from '../../hook/useSelectorHook';
import { Navigate } from 'react-router-dom';


type ErrorType = {
    email?: string
    password?: string
}
export type LoginType = {
    email: string
    password: string
    RememberMe: boolean
}

export const Login = () => {

    const dispatch = useTypeDispatch()
    const isLoggenIn = useAppSelector(state=> state.auth.isLoggedIn) 
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            RememberMe: false,
        },
        validate: (values) => {
            const errors: ErrorType = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password?.length < 4) {
                errors.password = 'Invalid passwoed';
            }
            return errors;

        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        }
    })

    if(isLoggenIn) return <Navigate to={"/"}/>

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                            target={'_blank'} rel="noreferrer"> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
                        {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}

                        <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
                        {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}

                        <FormControlLabel label={'Remember me'} control={<Checkbox checked={formik.values.RememberMe} {...formik.getFieldProps("RememberMe")} />} />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}