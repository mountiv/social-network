import {ActionsType, profilePageType} from "./state";

const ADD_POST = "ADD-POST"
const CHANGE_NEW_TEXT = "CHANGE-NEW-TEXT"

export const AddPostAC = (postText: string) => ({
    type: ADD_POST,
    postText: postText
} as const)

export const ChangeNewTextAC = (newText: string) => ({
    type: CHANGE_NEW_TEXT,
    newText: newText
} as const)

const initialState: profilePageType = {
    postsData: [
        {id: 1, message: 'Hey, I like you', likeCounts: 13},
        {id: 2, message: 'I like it-kamasutra', likeCounts: 139}
    ],
    newPostText: ''
}

export const ProfilePageReducer = (state = initialState, action: ActionsType):profilePageType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: new Date().getTime(),
                message: action.postText,
                likeCounts: 0
            };
            // state.postsData.push(newPost)
            return {...state, postsData: [...state.postsData, newPost] }
        case CHANGE_NEW_TEXT:
            // state.newPostText = action.newText
            return {...state, newPostText: action.newText};
        default:
            return state
    }
}