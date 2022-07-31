import {authMe} from "./AuthReducer";
import {ErrorResponseType, handleNetworkError} from "../utils/errorUtils";
import {AxiosError} from "axios";

//initial state
const initialState = {
    initialized: false
}

//type
export type AppActionsType = ReturnType<typeof initializingSuccess>
export type AppType = typeof initialState

//actions
const INITIALIZING_SUCCESS = 'APP/INITIALIZING-SUCCESS'

export const initializingSuccess = () =>
    ({type: INITIALIZING_SUCCESS} as const)

//reducer
export const appReducer = (state: AppType = initialState, action: AppActionsType): AppType => {
    switch (action.type) {
        case INITIALIZING_SUCCESS:
            return {
                ...state,
                initialized: true
            };
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
        handleNetworkError(err);
    }

}
