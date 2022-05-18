import {TOGGLE_IS_FETCHING, toggleIsFetching} from "./UsersPageReducer";
import {authMe} from "./AuthReducer";

const INITIALIZING_SUCCESS = 'APP/INITIALIZING-SUCCESS'

export const initializingSuccess = () =>
    ({type: INITIALIZING_SUCCESS} as const)

export const initializeApp = () => (dispatch: any) => {
    //dispatch(toggleIsFetching(true))
    dispatch(authMe())
        .then(() => {
            dispatch(initializingSuccess())
        })
}


export type AppType = {
    initialized: boolean
}

type ActionsType = ReturnType<typeof initializingSuccess>

const initialState: AppType = {
    initialized: false
}

export const appReducer = (state: AppType = initialState, action: ActionsType): AppType => {
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