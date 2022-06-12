import {authMe} from "./AuthReducer";

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
    await dispatch(authMe())
    dispatch(initializingSuccess())

}
