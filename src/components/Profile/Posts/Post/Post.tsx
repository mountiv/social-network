import React from "react";
import { useAppSelector } from "../../../../redux/reduxStore";
import s from './Post.module.css'

type PostType = {
    message: string;
    likeCount: number;
}

export const Post = (props: PostType) => {
    const avatar = useAppSelector(state => state.profilePage.profile?.photos?.large)

    return (
        <div className={s.item}>
            <div className={s.photoMessage}>
                <img src={avatar || 'https://www.meme-arsenal.com/memes/01fc26df82c8e314e3893ea3c15ad60a.jpg'} alt='ava'/>
                {props.message}
            </div>
            <div>
                <span> {props.likeCount}</span>
            </div>
        </div>
    )
}
