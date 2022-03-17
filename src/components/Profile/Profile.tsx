import React from "react";
import s from './Profile.module.css'
import {MyPostsContainer} from "./Posts/MyPostsContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {StoreType} from "../../redux/reduxStore";

type ProfileType = {
    store: StoreType
}

export const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}
            />
        </div>
    );
}
