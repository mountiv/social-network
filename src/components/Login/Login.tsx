import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/AuthReducer";
import {RootStateType} from "../../redux/reduxStore";
import {Navigate} from "react-router-dom";
import {useFormik} from "formik";
import {Button, Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";


export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}


export const Login = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<RootStateType, boolean>(state => state.auth.isAuth)
    const captcha = useSelector<RootStateType, string | null>(state => state.auth.captcha)


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
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


    if (isAuth) return <Navigate to={'/profile'} replace={true}/>
    return (
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
        </form>)
}
