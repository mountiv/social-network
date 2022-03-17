import React, {ChangeEvent} from "react";
import {AddPostAC, ChangeNewTextAC} from "../../../redux/ProfilePageReducer";
import {MyPosts} from "./MyPosts";
import {StoreType} from "../../../redux/reduxStore";

type MyPostsContainerType = {
    store: StoreType
}

export const MyPostsContainer = (props: MyPostsContainerType) => {
    const postsData = props.store.getState().profilePage.postsData
    const message = props.store.getState().profilePage.newPostText
    const dispatch = props.store.dispatch.bind(props.store)


    const addPostsCallback = (text: string) => {
        dispatch(AddPostAC(text))
        dispatch(ChangeNewTextAC(''))
    }

    const onPostChange = (text: string) => {
        dispatch(ChangeNewTextAC(text))
    }

    return (
        <div>
            <MyPosts postsData={postsData} message={message} addPostButton={addPostsCallback}
                     onPostChange={onPostChange}/>
        </div>
    )
}
