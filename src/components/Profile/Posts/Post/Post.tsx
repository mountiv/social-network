import React from "react";
import { useAppSelector } from "../../../../redux/reduxStore";
import FavoriteIcon from '@mui/icons-material/Favorite';
import s from './Post.module.css'
import noAva from "../../../../assets/images/naAvatar.png"

type PostType = {
    message: string;
    likeCount: number;
}

export const Post = (props: PostType) => {
    const avatar = useAppSelector(state => state.profilePage.profile?.photos?.large)

    return (
        <div className={s.item}>
            <div className={s.photoMessage}>
                <img src={avatar || noAva} alt='ava'/>
                {props.message}
            </div>
            <div className={s.likes}>
                <FavoriteIcon/>
                <span> {props.likeCount}</span>
            </div>
        </div>
    )
}
