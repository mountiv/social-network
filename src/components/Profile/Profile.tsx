import React from "react";
import s from './Profile.module.css'
import {MyPosts} from "./Posts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionsType, profilePageType} from "../../redux/state";

type ProfileType = {
    profilePage: profilePageType
    message: string
    dispatch: (action: ActionsType) => void
}

export const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts postsData={props.profilePage.postsData} dispatch={props.dispatch} message={props.message}
                     />
        </div>
    )
}
