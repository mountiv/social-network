import {ActionsType} from "./reduxStore";
import {postDataType} from "./state";

const ADD_POST = "ADD-POST"
const CHANGE_NEW_TEXT = "CHANGE-NEW-TEXT"
const SET_USER_PROFILE = "SET-USER-PROFILE"

export const AddPostAC = (postText: string) => ({
    type: ADD_POST,
    postText: postText
} as const)

export const ChangeNewTextAC = (newText: string) => ({
    type: CHANGE_NEW_TEXT,
    newText: newText
} as const)

export const setUserProfile = (profile: any) => ({
    type: SET_USER_PROFILE,
    profile: profile
} as const)

export type userProfile = null | {
    aboutMe: string | null
    contacts: {
        facebook: string | null
        website: string | null
        vk: string | null
        twitter: string | null
        instagram: string | null
        youtube: string | null
        github: string | null
        mainLink: string | null
    },
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: {
        small: string | null
        large: string | null
    }
}

export type profilePageType = {
    postsData: Array<postDataType>
    newPostText: string
    profile: userProfile
}


const initialState: profilePageType = {
    postsData: [
        {id: 1, message: 'Hey, I like you', likeCounts: 13},
        {id: 2, message: 'I like it-kamasutra', likeCounts: 139}
    ],
    newPostText: '',
    profile: null
}

export const ProfilePageReducer = (state = initialState, action: ActionsType): profilePageType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: new Date().getTime(),
                message: action.postText,
                likeCounts: 0
            };
            // state.postsData.push(newPost)
            return {...state, postsData: [...state.postsData, newPost]}
        case CHANGE_NEW_TEXT:
            // state.newPostText = action.newText
            return {...state, newPostText: action.newText};
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        default:
            return state
    }
}