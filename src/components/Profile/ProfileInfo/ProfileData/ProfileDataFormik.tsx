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
        //     const errors = {} as userProfile;
        //     if (Object.keys(values.contacts).map(key => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(key))) {
        //         // Object.keys(errors.contacts).map(key => (errors.contacts?[key] = 'Invalid contact'));
        //         errors.contacts.vk = 'Invalid value'
        //     }
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
                <b>Contacts: </b>{Object.keys(props.initialValues.contacts).map(key => {
                return <div key={key}>
                    <TextField
                        label={key}
                        margin="normal"
                        {...formik.getFieldProps('contacts.' + key)}
                    />
                    {/*{formik.touched.contacts?[key] && formik.errors.contacts?[key] &&*/}
                    {/*    <div style={{color: 'red'}}>{formik.errors.contacts}</div>}*/}
                </div>
            })}
            </div>
            <Button type={'submit'} variant={'contained'} color={'primary'}>
                Save
            </Button>
        </FormGroup>
    </form>
}
