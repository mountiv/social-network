import {ActionsType} from "./reduxStore";
import {TOGGLE_IS_FETCHING, toggleIsFetching} from "./UsersPageReducer";
import {Dispatch} from "redux";
import {authApi} from "../api/api";
import {FormDataType} from "../components/Login/Login";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET-USER-DATA'
const SET_FORM_DATA = 'SET-FORM-DATA'

export const setUserData = (userId: number | null, userEmail: string | null, userLogin: string | null, isAuth: boolean) =>
    ({type: SET_USER_DATA, payload: {userId, userEmail, userLogin, isAuth}} as const)

export const setFormData = (formData: FormDataType) =>
    ({type: SET_FORM_DATA, payload: {...formData}} as const)

export const authMe = () => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    authApi.authMe()
        .then(response => {
            dispatch(toggleIsFetching(false))
            if (response.resultCode === 0) {
                let {id, email, login} = response.data
                dispatch(setUserData(id, email, login, true))
            }
        })
}

export const login = (formData: FormDataType) => (dispatch: any) => {
    dispatch(toggleIsFetching(true))

    authApi.login(formData)
        .then(response => {
            dispatch(toggleIsFetching(false))
            if (response.resultCode === 0) {
                dispatch(authMe())
            } else {
                let message = response.messages.length > 0 ? response.messages[0] : 'Some error'
                dispatch(stopSubmit('login', {_error: message}))

            }
        })
}

export const logout = () => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    authApi.logout()
        .then(response => {
            dispatch(toggleIsFetching(false))
            if (response.resultCode === 0) {
                dispatch(setUserData(null, null, null, false))
            }
        })
}

export type AuthType = {
    userId: number | null
    userEmail: string | null
    userLogin: string | null
    isFetching: boolean
    isAuth: boolean

}

const initialState: AuthType = {
    userId: null,
    userEmail: null,
    userLogin: null,
    isFetching: true,
    isAuth: false

}

export const authReducer = (state: AuthType = initialState, action: ActionsType): AuthType => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_FORM_DATA:
            return {
                ...state,
                ...action.payload
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            };
        default:
            return state
    }
}