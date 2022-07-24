import React from "react";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../../common/formsControls/FormControls";
import {userProfile} from "../../../../redux/ProfilePageReducer";
import s from "../../../common/formsControls/FormControls.module.css";
import {useFormik} from "formik";
import {login} from "../../../../redux/AuthReducer";
import {FormDataType} from "../../../Login/Login";
import {Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";

export type ProfileDataType = {
    fullName: string
    aboutMe: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

export const ProfileDataFormik = (props: { initialValues: userProfile, onSubmit: (formData: userProfile) => void }) => {
    const formik = useFormik({
        initialValues: props.initialValues,
        onSubmit: props.onSubmit
    })

    return <form onSubmit={formik.handleSubmit}>
        <FormGroup>
            <TextField
                label="Full name"
                margin="normal"
                {...formik.getFieldProps('fullName')}
            />
            <TextField
                label="About me:"
                margin="normal"
                {...formik.getFieldProps('aboutMe')}
            />
            <FormControlLabel
                label={'Looking for a job'}
                control={<Checkbox checked={formik.values.lookingForAJob}
                                   {...formik.getFieldProps('lookingForAJob')}
                />}/>
            <TextField
                label="My professional skills:"
                margin="normal"
                {...formik.getFieldProps('lookingForAJobDescription')}
            />

            <div>
                <b>Contacts: </b>{Object.keys(props.initialValues.contacts).map(key => {
                    return <div key={key}>
                        <TextField
                            label={key}
                            margin="normal"
                            {...formik.getFieldProps('contacts.' + key)}
                        />
                    </div>
                }
            )}
            </div>
        </FormGroup>
    </form>
}
