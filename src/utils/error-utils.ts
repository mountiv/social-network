import {Dispatch} from 'redux'
import {AppActionsType, setAppError} from "../redux/AppReducer";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppActionsType>) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('Some error occurred'))
    }
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppError(error.message ? error.message : 'Some error occurred'))
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<string>
    data: D
}
