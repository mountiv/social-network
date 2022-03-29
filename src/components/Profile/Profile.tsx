import React from "react";
import s from './Profile.module.css'
import {MyPostsContainer} from "./Posts/MyPostsContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";

type ProfileType = {
    // store: StoreType
}

export const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    );
}
