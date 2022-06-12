import s from './FormControls.module.css'
import {Field} from "redux-form";
import {required} from "../../../utils/validators";
import React from "react";

export const FormControl = ({input, meta, children, ...props}: any) => {
    const hasError = meta.touched && meta.error

    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span className={s.formControl + ' ' + s.error}>{meta.error}</span>}
        </div>
    )
}

export const Textarea = (props: any) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}> <textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props: any) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}> <input {...input} {...restProps}/></FormControl>
}

export const createField = (name: string, component: (props: any) => JSX.Element,
                            placeholder: string, validate?: Array<any>, type?: string, text?: string) =>
    <div>
        <Field name={name} component={component} placeholder={placeholder}
               validate={validate} type={type}
        />{text}
    </div>
