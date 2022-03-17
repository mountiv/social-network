import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {postDataType} from "../../../redux/state";

type MyPostsType = {
    postsData: Array<postDataType>
    message: string
    onPostChange: (value: string) => void
    addPostButton: (text: string) => void
}

export const MyPosts = (props: MyPostsType) => {
    const PostValue = React.createRef<HTMLTextAreaElement>()
    const addPostsCallback = () => {
        PostValue.current && props.addPostButton(PostValue.current.value)
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onPostChange(e.currentTarget.value)
    }

    let postsElement = props.postsData
        .map(p => <Post message={p.message} likeCount={p.likeCounts}/>)

    return (
        <div>
            <div>
                <h3>My Posts</h3>
                <div>
                    <textarea ref={PostValue}
                              onChange={onPostChange}
                              value={props.message}/>
                </div>
                <div>
                    <button onClick={addPostsCallback}>Add Post</button>
                </div>
            </div>
            <div>
                {postsElement}
            </div>
        </div>
    )
}
