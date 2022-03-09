import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {ActionsType, postDataType} from "../../../redux/state";
import {AddPostAC, ChangeNewTextAC} from "../../../redux/ProfilePageReducer";

type MyPostsType = {
    postsData: Array<postDataType>
    message: string
    dispatch: (action: ActionsType) => void

}

export const MyPosts = (props: MyPostsType) => {
    const PostValue = React.createRef<HTMLTextAreaElement>()
    const addPostsCallback = () => {
        PostValue.current && props.dispatch(AddPostAC(PostValue.current.value))
        props.dispatch(ChangeNewTextAC(''))
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(ChangeNewTextAC(e.currentTarget.value))
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
