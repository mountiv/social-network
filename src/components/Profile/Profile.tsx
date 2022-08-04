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
    saveSubmit: (value: userProfile) => void
    setProfileEdit: (profileEdit: boolean) => void
    profileEdit: boolean
}

export const Profile = (props: ProfileType) => {
    return (
        <div>
            {props.profile
                &&
                <>                <ProfileInfo savePhoto={props.savePhoto}
                                               isOwner={props.isOwner}
                                               profile={props.profile}
                                               status={props.status}
                                               updateStatus={props.updateStatus}
                                               saveSubmit={props.saveSubmit}
                                               setProfileEdit={props.setProfileEdit}
                                               profileEdit={props.profileEdit}

                />
                    {props.isOwner && <MyPostsContainer/>}
                </>

            }

        </div>
    );
}
