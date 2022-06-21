import {userProfile} from "../../../../redux/ProfilePageReducer";
import React from "react";

export const ProfileData = ({
                                profile,
                                ...props
                            }: { profile: userProfile, toEditMode: () => void, isOwner: boolean }) => {
    return <>
        <div>{props.isOwner && <button onClick={props.toEditMode}>Edit</button>}</div>
        <div>
            <b>Full name: </b>
            {profile.fullName}
        </div>
        <div><b>About me: </b>{profile.aboutMe}</div>
        <div>
            <b>Looking for a job: </b>
            {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {
            profile.lookingForAJob &&
            <div>
                <b>My professional skills: </b>
                {profile.lookingForAJobDescription}
            </div>
        }
    </>
}