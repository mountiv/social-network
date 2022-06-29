import React, {ChangeEvent} from "react";
import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {postDataType} from "../../../redux/state";
import {InjectedFormProps} from "redux-form/lib/reduxForm";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators";
import {Textarea} from "../../common/formsControls/FormControls";

type MyPostsType = {
    postsData: Array<postDataType>
    addPostButton: (text: string) => void
}

const maxLength30 = maxLengthCreator(30)

export const MyPosts = (props: MyPostsType) => {
    const addNewPost = (values: { newPost: string }) => {
        props.addPostButton(values.newPost)
    }

    let postsElement = props.postsData
        .map(p => <Post key={p.id} message={p.message} likeCount={p.likeCounts}/>)

    return (
        <div>
            <div>
                <h3>My Posts</h3>
                <AddPostBodyRedux onSubmit={addNewPost}/>
            </div>
            <div>
                {postsElement}
            </div>
        </div>
    )
}

const AddPostBody: React.FC<InjectedFormProps<{ newPost: string }>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component={Textarea}
               name={'newPost'}
               placeholder={'Enter your post'}
               validate={[required, maxLength30]}
        />
        <button>Add Post</button>
    </form>
}

const AddPostBodyRedux = reduxForm<{ newPost: string }>({
    form: 'profileAddNewPostForm'
})(AddPostBody)
