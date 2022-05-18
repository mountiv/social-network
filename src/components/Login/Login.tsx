import {Field, reduxForm} from "redux-form";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/AuthReducer";
import {Input} from "../common/formsControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators";
import {RootStateType} from "../../redux/reduxStore";
import {Link, Navigate} from "react-router-dom";
import s from './../common/formsControls/FormControls.module.css'


export type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<RootStateType, boolean>(state => state.auth.isAuth)

    const onSubmit = (formData: FormDataType) => {
        dispatch(login({...formData}))
    }

    if (isAuth) return <Navigate to={'/profile'} replace={true}/>
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const maxLength30 = maxLengthCreator(30)

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name={'email'} component={Input} placeholder={'Email'}
                   validate={[required, maxLength30]}
            />
        </div>
        <div>
            <Field name={'password'} component={Input} placeholder={'Password'}
                   type={'password'}
                   validate={[required, maxLength30]}
            />
        </div>
        <div>
            <Field name={'rememberMe'} component={Input} type={'checkbox'}/> Remember me
        </div>
        {props.error &&
            <div className={s.formSummaryError}>
                {props.error}
            </div>}
        <div>
            <button>Log In</button>
        </div>

    </form>
}

const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)