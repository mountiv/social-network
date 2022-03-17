import React from "react";
import s from './ProfileInfo.module.css'

export const ProfileInfo = () => {
    return (
        <div>
            <div className={s.imgWrapper}>
                <img alt={'ava'} src='https://www.kartinki24.ru/uploads/gallery/main/374/kartinki24_ru_autumn_273.jpg'/>
            </div>
            <div>
                Ava+Description
                <img/>
            </div>
        </div>
    )
}
