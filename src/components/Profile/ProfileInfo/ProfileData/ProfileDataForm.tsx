import React from "react";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../../common/formsControls/FormControls";
import {userProfile} from "../../../../redux/ProfilePageReducer";

export type ProfileDataType = {
    fullName: string
    aboutMe: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

// @ts-ignore
export const ProfileDataForm: React.FC<InjectedFormProps<{ profile: userProfile }>> = ({handleSubmit, profile}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <button>Save</button>
        </div>
        <div>
            <b>Full name: </b>
            {createField('fullName', Input, 'Full name', [])}
        </div>
        <div>
            <b>About me: </b>
            {createField('aboutMe', Textarea, 'About me', [])}
        </div>
        <div>
            <b>Looking for a job: </b>
            {createField('lookingForAJob', Input, '', [], 'checkbox')}
        </div>
        <div>
            <b>My professional skills: </b>
            {createField('lookingForAJobDescription', Textarea, 'Professional skills', [])}
        </div>
        <div>
            <b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
                return <div>
                    <b>{key}: </b>
                    {createField('contacts.' + key, Input, key, [])}
                </div>
            }
        )}
        </div>

    </form>
}

export const ProfileDataReduxForm = reduxForm<{ profile: userProfile }>(
    {form: 'profileData'}
)(ProfileDataForm)