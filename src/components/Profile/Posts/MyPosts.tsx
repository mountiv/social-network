import React from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";

export const MyPosts = () => {
    return (
        <div>
            <div>
                <textarea></textarea>
                <button>Add Post</button>
            </div>
            <div>
                <Post message='Hey, I like you' likeCount={10}/>
                <Post message='I like it-kamasutra' likeCount={1000}/>
            </div>
        </div>
    )
}
