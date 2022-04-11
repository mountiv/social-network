import React from "react";
import s from './Profile.module.css'
import {MyPostsContainer} from "./Posts/MyPostsContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfileType} from "./ProfileContainer";
import {userProfile} from "../../redux/ProfilePageReducer";

export const Profile = (props: ProfileType) => {
    return (
        <div>
            {props.profile && <ProfileInfo {...props.profile}/>}
            <MyPostsContainer/>
        </div>
    );
}
