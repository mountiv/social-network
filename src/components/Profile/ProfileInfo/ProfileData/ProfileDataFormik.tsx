import React from "react";
import {userProfile} from "../../../../redux/ProfilePageReducer";
import {useFormik} from "formik";
import {Button, Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";

export type ProfileDataType = {
    fullName: string
    aboutMe: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

export const ProfileDataFormik = (props: { initialValues: userProfile, onSubmit: (formData: userProfile) => void }) => {
    const formik = useFormik({
        initialValues: props.initialValues,
        onSubmit: props.onSubmit,
        // validate: (values) => {
        //     const errors = {contacts: {}} as { contacts: { [key: string]: string } };
        //     Object.entries(values.contacts).forEach(([key, value]) => {
        //         if (value && (/^[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm ||
        //             /@([A-Za-z0-9_]{1,15})/).test(value)) {
        //             errors.contacts[key] = 'Invalid contact'
        //         }
        //     })
        //     return errors
        // },
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
                <b>Contacts: </b>{(Object.keys(props.initialValues.contacts) as (keyof typeof props.initialValues.contacts)[]).map((key) => {
                return <div key={key}>
                    <TextField
                        label={key}
                        margin="normal"
                        {...formik.getFieldProps('contacts.' + key)}
                    />
                    {/*{formik.errors.contacts && formik.errors.contacts[key] && formik.touched.contacts && formik.touched.contacts[key] &&*/}
                    {/*    <div style={{color: 'red'}}>{formik.errors.contacts[key]}</div>}*/}
                </div>
            })}
            </div>
            <Button type={'submit'} variant={'contained'} color={'primary'}>
                Save
            </Button>
        </FormGroup>
    </form>
}
