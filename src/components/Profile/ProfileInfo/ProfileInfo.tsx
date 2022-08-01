import React, {ChangeEvent} from "react";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileType} from "../Profile";
import {ProfileStatus} from "../ProfileStatus/ProfileStatus";
import {Contact} from "./Contacts/Contacts";
import {ProfileData} from "./ProfileData/ProfileData";
import {userProfile} from "../../../redux/ProfilePageReducer";
import s from './ProfileInfo.module.css'
import {ProfileDataFormik} from "./ProfileData/ProfileDataFormik";
import {toast, ToastContainer} from "react-toastify";


export const ProfileInfo = (props: ProfileType) => {
    const profile = {...props.profile, contacts: {...props.profile.contacts}, photos: {...props.profile.photos}}

    const onAddPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: userProfile) => {
        props.saveSubmit(formData)
    }

    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div className={s.wrapper}>
            <div className={s.avaBlock}>
                {profile.photos.large && <img className={s.ava} alt={'Photo'} src={profile.photos.large}/>}
                {props.isOwner &&
                    <label className={s.labelPhoto}>
                        <input type="file" onChange={onAddPhoto} className={s.inputPhoto}/>
                        Change Avatar
                    </label>
                }
                {!props.profileEdit && <div>{props.isOwner && <button
                    onClick={() => props.setProfileEdit(!props.profileEdit)}>{'Edit Profile'}</button>}</div>}
            </div>
            <div>
                <b>{profile.fullName}</b>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
                <br/>
                {props.profileEdit
                    ? <ProfileDataFormik
                        initialValues={profile}
                        onSubmit={onSubmit}/>
                    : <>
                        <ProfileData profile={profile} isOwner={props.isOwner}/>
                        <div>
                            <b>Contacts: </b>{Object.keys(profile.contacts).map((key) =>
                            //@ts-ignore
                            <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                        )}
                        </div>
                    </>
                }

            </div>
        </div>
    )
}
