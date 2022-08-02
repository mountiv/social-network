import React, {ChangeEvent, useState} from "react";
import {Post} from "./Post/Post";
import {postDataType} from "../../../redux/state";
import s from "./MyPosts.module.css"
import {Button, TextField} from "@mui/material";

type MyPostsType = {
    postsData: Array<postDataType>
    addPostButton: (text: string) => void
}

export const MyPosts = (props: MyPostsType) => {
    const [post, setPost] = useState<string>('')

    const addNewPost = () => {
        if (post) props.addPostButton(post)
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
                <div className={s.addPost}>
                    <TextField placeholder={'Enter your post'}
                               value={post}
                               name={'newPost'}
                               style={{maxWidth: 400}}
                               onChange={onPostChange}
                    />
                    <Button variant="contained" disabled={!post} onClick={addNewPost}>Add Post</Button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
}


