import {postDataType} from "./state";
import {Dispatch} from "redux";
import {profileApi} from "../api/api";
import {ProfileDataType} from "../components/Profile/ProfileInfo/ProfileData/ProfileDataForm";
import {RootStateType} from "./reduxStore";
import {stopSubmit} from "redux-form";

//initial state
const initialState: profilePageType = {
    postsData: [
        {id: 1, message: 'Hey, I like you', likeCounts: 13},
        {id: 2, message: 'I like it-kamasutra', likeCounts: 139}
    ],
    profile: {} as userProfile,
    status: '',
    profileEdit: false
}

//actions
const ADD_POST = "PROFILE-PAGE/ADD-POST"
const SET_USER_PROFILE = "PROFILE-PAGE/SET-USER-PROFILE"
const SET_USER_STATUS = "PROFILE-PAGE/SET-USER-STATUS"
const UPDATE_STATUS = "PROFILE-PAGE/UPDATE-STATUS"
const DELETE_POST = "PROFILE-PAGE/DELETE-POST"
const UPDATE_PHOTO = "PROFILE-PAGE/UPDATE-PHOTO"
const SET_PROFILE_EDIT = "PROFILE-PAGE/PROFILE-EDIT"

export const AddPostAC = (postText: string) => ({
    type: ADD_POST,
    postText: postText
} as const)
export const DeletePostAC = (id: number) => ({
    type: DELETE_POST,
    id
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
export const setNewPhoto = (photos: { small: string | null, large: string | null }) => ({
    type: UPDATE_PHOTO,
    photos
} as const)
export const setProfileEdit = (profileEdit: boolean) => ({
    type: SET_PROFILE_EDIT, profileEdit
} as const)


//reducer
export const ProfilePageReducer = (state = initialState, action: ProfileActionsType): profilePageType => {
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
        case DELETE_POST:
            return {...state, postsData: state.postsData.filter(p => p.id !== action.id)}
        case UPDATE_PHOTO:
            return {
                ...state, profile: {...state.profile, photos: action.photos}
            }
        case SET_PROFILE_EDIT:
            return {...state, profileEdit: action.profileEdit}
        default:
            return state
    }
}


//thunks
export const getUserProfile = (userId: number | null) => async (dispatch: Dispatch) => {
    let response = await profileApi.getUserProfile(userId)
    dispatch(setUserProfile(response))
}

export const getUserStatus = (userId: number | null) => async (dispatch: Dispatch) => {
    let response = await profileApi.getUserStatus(userId)
    dispatch(setUserStatus(response))
}

export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    let response = await profileApi.updateUserStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setNewStatus(status))
    }
}

export const savePhoto = (photo: string) => async (dispatch: Dispatch) => {
    let response = await profileApi.updatePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(setNewPhoto({large: photo, small: ''}))
    }
}

export const saveSubmit = (profile: userProfile) => async (dispatch: any, getState: () => RootStateType) => {
    const userId: number | null = getState().auth.userId
    const response = await profileApi.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
        dispatch(setProfileEdit(false))
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('profileData', {_error: message}))
        dispatch(setProfileEdit(true))
    }
}

//types
export type ProfileActionsType =
    ReturnType<typeof AddPostAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setUserStatus>
    | ReturnType<typeof DeletePostAC>
    | ReturnType<typeof setNewStatus>
    | ReturnType<typeof setNewPhoto>
    | ReturnType<typeof setProfileEdit>;

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
    profile: userProfile
    status: string
    profileEdit: boolean
}