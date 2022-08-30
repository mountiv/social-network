import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/AuthReducer";
import {RootStateType, useAppSelector} from "../../redux/reduxStore";
import {Navigate, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";


export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string | null
}


export const Login = () => {
    const dispatch = useDispatch()
    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
    const captcha = useAppSelector<string | null>(state => state.auth.captcha)
    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: null
        },
        validate: (values) => {
            const errors = {} as FormDataType;
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 2) {
                errors.password = 'Must be 3 symbols or more'
            }
            return errors;
        },
        onSubmit: async (values, formikHelpers) => {
            await dispatch(login(values))
            formik.resetForm();
        },
    })

    useEffect(() => {
        if (isAuth) navigate(-1)
    }, [isAuth])

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>

                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup sx={{maxWidth: 300}}>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                            />

                            {formik.touched.email && formik.errors.email &&
                                <div style={{color: 'red'}}>{formik.errors.email}</div>}

                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps('password')}

                            />

                            {formik.touched.password && formik.errors.password &&
                                <div style={{color: 'red'}}>{formik.errors.password}</div>}

                            {captcha &&
                                <>
                                    <img src={captcha}/>
                                    <TextField
                                        type="captcha"
                                        label="captcha"
                                        margin="normal"
                                        {...formik.getFieldProps('captcha')}

                                    />
                                </>
                            }

                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox checked={formik.values.rememberMe}
                                                   {...formik.getFieldProps('rememberMe')}
                                />}
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Grid>
        </Grid>)
}
