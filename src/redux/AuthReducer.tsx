import {TOGGLE_IS_FETCHING, toggleIsFetching} from "./UsersPageReducer";
import {Dispatch} from "redux";
import {authApi, securityApi} from "../api/api";
import {FormDataType} from "../components/Login/Login";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

//initial state
const initialState: AuthType = {
    userId: null,
    userEmail: null,
    userLogin: null,
    isFetching: true,
    isAuth: false,
    captcha: null

}

//actions
const SET_USER_DATA = 'AUTH/SET-USER-DATA'
const SET_FORM_DATA = 'AUTH/SET-FORM-DATA'
const GET_CAPTCHA_URL = 'AUTH/GET-CAPTCHA-URL'

export const setUserData = (userId: number | null, userEmail: string | null, userLogin: string | null, isAuth: boolean) =>
    ({type: SET_USER_DATA, payload: {userId, userEmail, userLogin, isAuth}} as const)

export const setFormData = (formData: FormDataType) =>
    ({type: SET_FORM_DATA, payload: {...formData}} as const)

export const getCaptchaUrlSuccess = (captcha: string) =>
    ({type: GET_CAPTCHA_URL, captcha} as const)


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
        case GET_CAPTCHA_URL:
            return {...state, captcha: action.captcha}
        default:
            return state
    }
}

//thunks
export const authMe = () => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    try {
        const response = await authApi.authMe()
        dispatch(toggleIsFetching(false))
        if (response.resultCode === 0) {
            const {id, email, login} = response.data
            dispatch(setUserData(id, email, login, true))
        } else {
            handleServerAppError(response, dispatch)
        }
    } catch (e) {
        const err = e as AxiosError<ErrorResponseType>;
        handleServerNetworkError(err, dispatch);
    }
}

export const login = (formData: FormDataType) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true))
    try {
        const response = await authApi.login(formData)
        dispatch(toggleIsFetching(false))
        if (response.resultCode === 0) {
            dispatch(authMe())
        } else {
            if (response.resultCode === 10) {
                dispatch(getCaptchaUrl())
            } else {
                handleServerAppError(response, dispatch)
            }
        }
    } catch (e) {
        const err = e as AxiosError<ErrorResponseType>;
        handleServerNetworkError(err, dispatch);
    }
}

export const logout = () => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    try {
        const response = await authApi.logout()
        dispatch(toggleIsFetching(false))
        if (response.resultCode === 0) {
            dispatch(setUserData(null, null, null, false))
        } else {
            handleServerAppError(response, dispatch)
        }
    } catch (e) {
        const err = e as AxiosError<ErrorResponseType>;
        handleServerNetworkError(err, dispatch);
    }
}

export const getCaptchaUrl = () => async (dispatch: Dispatch) => {
    const response = await securityApi.getCaptchaUrl()
    dispatch(getCaptchaUrlSuccess(response.url))
}

//types
export type AuthType = {
    userId: number | null
    userEmail: string | null
    userLogin: string | null
    isFetching: boolean
    isAuth: boolean
    captcha: string | null
}

export type AuthActionsType = ReturnType<typeof setFormData>
    | ReturnType<typeof setUserData>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof getCaptchaUrlSuccess>


export type ErrorResponseType = {
    messages?: Array<string> | null;
};


