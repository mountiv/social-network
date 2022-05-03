import React from "react";
import s from './Profile.module.css'
import {MyPostsContainer} from "./Posts/MyPostsContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {userProfile} from "../../redux/ProfilePageReducer";

export type ProfileType = {
    profile: userProfile
    status: string
    updateStatus: (status:string) => void
}

export const Profile = (props: ProfileType ) => {
    return (
        <div>
            {props.profile && <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>}
            <MyPostsContainer/>
        </div>
    );
}
