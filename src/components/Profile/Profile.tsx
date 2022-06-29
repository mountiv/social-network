import React from "react";
import s from './Profile.module.css'
import {MyPostsContainer} from "./Posts/MyPostsContainer";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {userProfile} from "../../redux/ProfilePageReducer";

export type ProfileType = {
    profile: userProfile
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: any) => void
    saveSubmit: (value: { profile: userProfile }) => void
    setProfileEdit: (profileEdit: boolean) => void
    profileEdit: boolean
}

export const Profile = (props: ProfileType) => {
    return (
        <div>
            {props.profile
                ?
                <ProfileInfo savePhoto={props.savePhoto}
                             isOwner={props.isOwner}
                             profile={props.profile}
                             status={props.status}
                             updateStatus={props.updateStatus}
                             saveSubmit={props.saveSubmit}
                             setProfileEdit={props.setProfileEdit}
                             profileEdit={props.profileEdit}

                />
                :
                <div className={s.imgWrapper}>
                    <img alt={'ava'}
                         src='https://www.kartinki24.ru/uploads/gallery/main/374/kartinki24_ru_autumn_273.jpg'/>
                </div>}
            <MyPostsContainer/>
        </div>
    );
}
