import {Field, reduxForm} from "redux-form";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/AuthReducer";
import {createField, Input} from "../common/formsControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators";
import {RootStateType} from "../../redux/reduxStore";
import {Navigate} from "react-router-dom";
import s from './../common/formsControls/FormControls.module.css'


export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export const Login = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<RootStateType, boolean>(state => state.auth.isAuth)
    const captcha = useSelector<RootStateType, string | null>(state => state.auth.captcha)

    const onSubmit = (formData: FormDataType) => {
        dispatch(login({...formData}))
    }

    if (isAuth) return <Navigate to={'/profile'} replace={true}/>
    return <div>
        <h1>Login</h1>
        <LoginReduxForm captcha={captcha} onSubmit={onSubmit}/>
    </div>
}

const maxLength30 = maxLengthCreator(30)

const LoginForm: React.FC<InjectedFormProps<FormDataType, { captcha: string | null }> & { captcha: string | null }> = ({
                                                                                                                           error,
                                                                                                                           handleSubmit,
                                                                                                                           captcha
                                                                                                                       }) => {
    return <form onSubmit={handleSubmit}>

        {createField('email', Input, 'Email', [required, maxLength30])}
        {createField('password', Input, 'Password', [required, maxLength30], 'password')}
        {createField('rememberMe', Input, '', [], 'checkbox', 'Remember me')}
        {captcha && <img src={captcha}/>}
        {captcha &&
            createField('captcha', Input, 'Symbols from image', [required])
        }
        {error &&
            <div className={s.formSummaryError}>
                {error}
            </div>}
        <div>
            <button>Log In</button>
        </div>

    </form>
}

const LoginReduxForm = reduxForm<FormDataType, { captcha: string | null }>({
    form: 'login'
})(LoginForm)