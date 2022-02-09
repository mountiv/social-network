import React from "react";
import s from './Profile.module.css'
import {MyPosts} from "./Posts/MyPosts";

export const Profile = () => {
    return (
        <div className={s.content}>
            <div>
                <img src='https://www.kartinki24.ru/uploads/gallery/main/374/kartinki24_ru_autumn_273.jpg'/>
            </div>
            <div>
                Ava+Description
                <img/>
            </div>
            <MyPosts/>
        </div>
    )
}
