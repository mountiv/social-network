import {ActionsType} from "./reduxStore";
import {TOGGLE_IS_FETCHING, toggleIsFetching} from "./UsersPageReducer";
import {Dispatch} from "redux";
import {authApi} from "../api/api";

const SET_USER_DATA = 'SET-USER-DATA'

export const setUserData = (userId: number, userEmail: string, userLogin: string) =>
    ({type: SET_USER_DATA, payload: {userId, userEmail, userLogin}} as const)

export const loginUser = () => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    authApi.loginUser()
        .then(response => {
            dispatch(toggleIsFetching(false))
            if (response.resultCode === 0) {
                let {id, email, login} = response.data
                dispatch(setUserData(id, email, login))
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
    isFetching: false,
    isAuth: false

}

export const authReducer = (state: AuthType = initialState, action: ActionsType): AuthType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: true
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        default:
            return state
    }
}