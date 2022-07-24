import {userProfile} from "../../../../redux/ProfilePageReducer";
import React from "react";

export const ProfileData = ({
                                profile,
                                ...props
                            }: { profile: userProfile, isOwner: boolean }) => {
    return <>
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