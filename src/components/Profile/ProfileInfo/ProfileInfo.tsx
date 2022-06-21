import React, {ChangeEvent, useState} from "react";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileType} from "../Profile";
import {ProfileStatus} from "../ProfileStatus/ProfileStatus";
import {Contact} from "./Contacts/Contacts";
import {ProfileData} from "./ProfileData/ProfileData";
import {ProfileDataReduxForm} from "./ProfileData/ProfileDataForm";
import {userProfile} from "../../../redux/ProfilePageReducer";

export const ProfileInfo = (props: ProfileType) => {
    const profile = {...props.profile, contacts: {...props.profile.contacts}, photos: {...props.profile.photos}}
    const [editMode, setEditMode] = useState(false)

    const onAddPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: { profile: userProfile }) => {
        props.saveSubmit(formData)
        setEditMode(false)
    }

    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div>
                {profile.photos.large && <img alt={'Photo'} src={profile.photos.large}/>}
                {/*{profile.photos.small && <img src={profile.photos.small}/>}*/}
                {props.isOwner && <input type="file" onChange={onAddPhoto}/>}
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
                <div>
                    {editMode
                        ? <ProfileDataReduxForm
                            //@ts-ignore
                            initialValues={profile}
                            onSubmit={onSubmit}
                            profile={profile}/>
                        : <ProfileData profile={profile} isOwner={props.isOwner} toEditMode={() => setEditMode(true)}/>}
                    <div>
                        <b>Contacts: </b>{Object.keys(profile.contacts).map(key =>
                        //@ts-ignore
                        <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}
