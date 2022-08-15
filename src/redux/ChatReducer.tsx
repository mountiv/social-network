import {chatApi, ChatMessageAPIType, StatusType} from "../api/chat-api";
import {Dispatch} from "redux";
import {v1} from "uuid";

//initial state
const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

export type ChatMessageType = {
    id: string
    message: string
    photo: string
    userId: number
    userName: string
}

//type
export type ActionsType = ReturnType<typeof messagesReceived> | ReturnType<typeof statusChanged>

//actions
const messagesReceived = (messages: ChatMessageAPIType[]) => ({
    type: 'chat/MESSAGES-RECEIVED', payload: {messages}
} as const)

const statusChanged = (status: StatusType) => ({
    type: 'chat/STATUS-CHANGED', payload: {status}
} as const)


//reducer
export const chatReducer = (state = initialState, action: ActionsType): typeof initialState => {
    switch (action.type) {
        case "chat/MESSAGES-RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages].map(m => ({
                    ...m,
                    id: v1()
                })).filter((m, index, array) => index >= array.length - 100)
            };
        case 'chat/STATUS-CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }
}

//thunk
let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => dispatch(messagesReceived(messages))
    }
    return _newMessageHandler
};

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => dispatch(statusChanged(status))
    }
    return _statusChangedHandler
};

export const startMessagesListening = () => async (dispatch: any) => {
    chatApi.start()
    chatApi.subscribe("messages-received", newMessageHandlerCreator(dispatch))
    chatApi.subscribe("status-changed", statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = () => async (dispatch: any) => {
    chatApi.unsubscribe("messages-received", newMessageHandlerCreator(dispatch))
    chatApi.unsubscribe("status-changed", statusChangedHandlerCreator(dispatch))
    chatApi.stop()
}

export const sendMessage = (message: string) => async (dispatch: any) => {
    await chatApi.sendMessage(message)
}
