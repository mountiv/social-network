import React from "react";
import s from './ProfileInfo.module.css'
import {userProfile} from "../../../redux/ProfilePageReducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatus} from "../ProfileStatus/ProfileStatus";
import {ProfileType} from "../Profile";

export const ProfileInfo = (props: ProfileType) => {
    const profile = {...props.profile, contacts: {...props.profile.contacts}, photos: {...props.profile.photos}}
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div>
                {profile.photos.large && <img src={profile.photos.large}/>}
                {profile.photos.small && <img src={profile.photos.small}/>}
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
                <div>{profile.fullName}</div>
                <div>{profile.aboutMe}</div>
                <div>{profile.contacts.vk}</div>
                <div>{profile.contacts.facebook}</div>
                <div>{profile.contacts.github}</div>
            </div>
        </div>
    )
}
