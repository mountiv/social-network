import {ActionsType} from "./reduxStore";
import {TOGGLE_IS_FETCHING, toggleIsFetching} from "./UsersPageReducer";
import {Dispatch} from "redux";
import {authApi} from "../api/api";
import {FormDataType} from "../components/Login/Login";
import {stopSubmit} from "redux-form";

//initial state
const initialState: AuthType = {
    userId: null,
    userEmail: null,
    userLogin: null,
    isFetching: true,
    isAuth: false

}

//actions
const SET_USER_DATA = 'SET-USER-DATA'
const SET_FORM_DATA = 'SET-FORM-DATA'

export const setUserData = (userId: number | null, userEmail: string | null, userLogin: string | null, isAuth: boolean) =>
    ({type: SET_USER_DATA, payload: {userId, userEmail, userLogin, isAuth}} as const)

export const setFormData = (formData: FormDataType) =>
    ({type: SET_FORM_DATA, payload: {...formData}} as const)


//reducer
export const authReducer = (state: AuthType = initialState, action: AuthActionsType): AuthType => {
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

//thunks
export const authMe = () => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    return authApi.authMe()
        .then(response => {
            dispatch(toggleIsFetching(false))
            if (response.resultCode === 0) {
                let {id, email, login} = response.data
                dispatch(setUserData(id, email, login, true))
            }
        })
}

export const login = (formData: FormDataType) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true))
    let response = await authApi.login(formData)
    dispatch(toggleIsFetching(false))
    if (response.resultCode === 0) {
        dispatch(authMe())
    } else {
        let message = response.messages.length > 0 ? response.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = () => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    let response = await authApi.logout()
    dispatch(toggleIsFetching(false))
    if (response.resultCode === 0) {
        dispatch(setUserData(null, null, null, false))
    }

}

//types
export type AuthType = {
    userId: number | null
    userEmail: string | null
    userLogin: string | null
    isFetching: boolean
    isAuth: boolean
}

export type AuthActionsType = ReturnType<typeof setFormData>
    | ReturnType<typeof setUserData>
    | ReturnType<typeof toggleIsFetching>



