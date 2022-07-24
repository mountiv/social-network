import React from "react";
import s from './Post.module.css'
import {LikeOutlined} from '@ant-design/icons';

type PostType = {
    message: string;
    likeCount: number;
}

export const Post = (props: PostType) => {
    return (
        <div className={s.item}>
            <div className={s.photoMessage}>
                <img src='https://whatsism.com/uploads/posts/2018-07/1530546770_rmk_vdjbx10.jpg' alt='ava'/>
                {props.message}
            </div>
            <div>
                <span><LikeOutlined/> {props.likeCount}</span>
            </div>
        </div>
    )
}
