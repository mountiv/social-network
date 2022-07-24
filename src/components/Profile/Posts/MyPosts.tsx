import React, {ChangeEvent, useState} from "react";
import {Post} from "./Post/Post";
import {postDataType} from "../../../redux/state";
import {Button, Input} from 'antd';
import s from "./MyPosts.module.css"

type MyPostsType = {
    postsData: Array<postDataType>
    addPostButton: (text: string) => void
}

const {TextArea} = Input;

export const MyPosts = (props: MyPostsType) => {
    const [post, setPost] = useState<string>('')

    const addNewPost = () => {
        if(post) props.addPostButton(post)
        setPost('')
    }
    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPost(e.currentTarget.value)
    }

    let postsElement = props.postsData
        .map(p => <Post key={p.id} message={p.message} likeCount={p.likeCounts}/>)

    return (
        <div className={s.container}>
            <div>
                <h3 className={s.header}>My Posts</h3>
                <TextArea placeholder={'Enter your post'}
                          value={post}
                          name={'newPost'} showCount maxLength={50}
                          style={{maxWidth: 400}}
                          onChange={onPostChange}
                />
                <Button disabled={!post} type={'primary'} onClick={addNewPost}>Add Post</Button>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
}


