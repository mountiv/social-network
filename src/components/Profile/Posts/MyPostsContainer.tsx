import React from "react";
import {AddPostAC} from "../../../redux/ProfilePageReducer";
import {MyPosts} from "./MyPosts";
import {DispatchType} from "../../../redux/reduxStore";
import {RootStateType} from "../../../redux/state";
import {connect} from "react-redux";


const mapStateToProps = (state: RootStateType) => {
    return {
        postsData: state.profilePage.postsData,
    }
}

const mapDispatchToProps = (dispatch: DispatchType) => {
    return {
        addPostButton: (text: string) => {
            dispatch(AddPostAC(text))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)