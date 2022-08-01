import {authMe, ErrorResponseType} from "./AuthReducer";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../utils/error-utils";

//initial state
const initialState = {
    initialized: false,
    error: null as string | null
}

//type
export type AppActionsType = ReturnType<typeof initializingSuccess> | ReturnType<typeof setAppError>
export type AppType = typeof initialState

//actions
const INITIALIZING_SUCCESS = 'APP/INITIALIZING-SUCCESS'
const SET_ERROR = 'APP/SET-ERROR'

export const initializingSuccess = () =>
    ({type: INITIALIZING_SUCCESS} as const)
export const setAppError = (error: string | null) =>
    ({type: SET_ERROR, error} as const)

//reducer
export const appReducer = (state: AppType = initialState, action: AppActionsType): AppType => {
    switch (action.type) {
        case INITIALIZING_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

//thunk
export const initializeApp = () => async (dispatch: any) => {
    try {
        await dispatch(authMe())
        dispatch(initializingSuccess())
    } catch (e) {
        const err = e as AxiosError<ErrorResponseType>;
        handleServerNetworkError(err, dispatch);
    }
}
