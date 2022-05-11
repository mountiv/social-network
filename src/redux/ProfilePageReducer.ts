import {ActionsType} from "./reduxStore";
import {postDataType} from "./state";
import {Dispatch} from "redux";
import {profileApi} from "../api/api";

const ADD_POST = "ADD-POST"
const SET_USER_PROFILE = "SET-USER-PROFILE"
const SET_USER_STATUS = "SET-USER-STATUS"
const UPDATE_STATUS = "UPDATE-STATUS"

export const AddPostAC = (postText: string) => ({
    type: ADD_POST,
    postText: postText
} as const)


export const setUserProfile = (profile: userProfile) => ({
    type: SET_USER_PROFILE,
    profile: profile
} as const)

export const setUserStatus = (status: string) => ({
    type: SET_USER_STATUS,
    status: status
} as const)

export const setNewStatus = (status: string) => ({
    type: UPDATE_STATUS,
    status: status
} as const)

export const getUserProfile = (userId: number | undefined) => (dispatch: Dispatch) => {
    profileApi.getUserProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response))
        })
}

export const getUserStatus = (userId: number | undefined) => (dispatch: Dispatch) => {
    profileApi.getUserStatus(userId)
        .then(response => {
            dispatch(setUserStatus(response))
        })
}

export const updateStatus = (status: string) => (dispatch: Dispatch) => {
    profileApi.updateUserStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setNewStatus(status))
            }
        })
}

export type userProfile = {
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
    profile: userProfile | null
    status: string
}


const initialState: profilePageType = {
    postsData: [
        {id: 1, message: 'Hey, I like you', likeCounts: 13},
        {id: 2, message: 'I like it-kamasutra', likeCounts: 139}
    ],
    profile: null,
    status: ''
}

export const ProfilePageReducer = (state = initialState, action: ActionsType): profilePageType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: new Date().getTime(),
                message: action.postText,
                likeCounts: 0
            };
            return {...state, postsData: [...state.postsData, newPost]}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        case SET_USER_STATUS:
        case UPDATE_STATUS:
            return {...state, status: action.status}
        default:
            return state
    }
}