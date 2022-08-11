import {chatApi, ChatMessageType} from "../api/chat-api";
import {Dispatch} from "redux";

//initial state
const initialState = {
    messages: [] as ChatMessageType[]
}

//type
export type ActionsType = ReturnType<typeof actions.messagesReceived>

//actions
export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'chat/MESSAGES-RECEIVED', payload: {messages}
    })
}

//reducer
export const chatReducer = (state = initialState, action: ActionsType): typeof initialState => {
    switch (action.type) {
        case "chat/MESSAGES-RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            };
        default:
            return state
    }
}

//thunk
let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => dispatch(actions.messagesReceived(messages))
    }
    return _newMessageHandler
};

export const startMessagesListening = () => async (dispatch: any) => {
    chatApi.start()
    chatApi.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = () => async (dispatch: any) => {
    chatApi.unsubscribe(newMessageHandlerCreator(dispatch))
    chatApi.stop()
}

export const sendMessage = (message: string) => async (dispatch: any) => {
    chatApi.sendMessage(message)
}
