import React from "react";
import s from './ProfileInfo.module.css'
import {userProfile} from "../../../redux/ProfilePageReducer";
import {Preloader} from "../../common/Preloader/Preloader";

export const ProfileInfo = (props: userProfile) => {
    if (!props) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.imgWrapper}>
                <img alt={'ava'} src='https://www.kartinki24.ru/uploads/gallery/main/374/kartinki24_ru_autumn_273.jpg'/>
            </div>
            <div>
                {props.photos.large && <img src={props.photos.large}/>}
                <div>{props.fullName}</div>
                <div>{props.aboutMe}</div>
                <div>{props.contacts.vk}</div>
                <div>{props.contacts.facebook}</div>
                <div>{props.contacts.github}</div>
            </div>
        </div>
    )
}
