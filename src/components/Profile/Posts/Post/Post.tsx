import React from "react";
import s from './Post.module.css'

type PostType = {
    message: string;
    likeCount: number;
}

export const Post = (props: PostType) => {
    return (
        <div className={s.item}>
            <img src='https://whatsism.com/uploads/posts/2018-07/1530546770_rmk_vdjbx10.jpg' alt='ava'/>
            {props.message}
            <div>
                <span>like {props.likeCount}</span>
            </div>
        </div>
    )
}
