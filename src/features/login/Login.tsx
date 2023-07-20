
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';


type ErrorType = {
    email?: string
    password?: string
}

export const Login = () => {

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
            return errors;

        },
        onSubmit: values => {
            alert(values.email)
        }
    })


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
                <FormGroup>
                    <TextField label="Email" margin="normal" value={formik.values.email} onChange={formik.handleChange} name='email' />
                    {formik.errors.email && <div>{formik.errors.email}</div>}
                    <TextField type="password" label="Password" margin="normal" value={formik.values.password} onChange={formik.handleChange} name='password' />
                    <FormControlLabel label={'Remember me'} control={<Checkbox name='RememberMe' value={formik.values.RememberMe} onChange={formik.handleChange} />} />
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>
                </FormGroup>
            </FormControl>
        </Grid>
    </Grid>
}