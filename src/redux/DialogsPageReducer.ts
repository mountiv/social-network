import {ActionsType} from "./reduxStore";

//initial state
const initialState: dialogsPageType = {
    dialogsData: [
        {id: 1, name: 'Viktor'},
        {id: 2, name: 'Vlad'},
        {id: 3, name: 'Kristina'},
        {id: 4, name: 'Lera'},
        {id: 5, name: 'Sergey'},
        {id: 6, name: 'Oliver'},
    ],

    messageData: [
        {id: 1, message: 'Hey, baby'},
        {id: 2, message: 'I miss you'},
        {id: 3, message: 'Cool'},
        {id: 4, message: 'I like it'},
        {id: 5, message: 'I like it-kamasutra'}
    ],
}

export const AddDialogMessageAC = (newMessage: string) => ({
    type: "ADD-DIALOG-MESSAGE",
    newMessage: newMessage
} as const)

// export const ChangeDialogMessageTextAC = (newText: string) => ({
//     type: "CHANGE-DIALOG-MESSAGE",
//     newText: newText
// } as const)

//reducer
export const DialogsPageReducer = (state = initialState, action: DialogsActionsType): dialogsPageType => {
    switch (action.type) {
        // case "CHANGE-DIALOG-MESSAGE":
        //     return {...state, newMessageText: action.newText};
        case "ADD-DIALOG-MESSAGE":
            let newMessageData = {id: 6, message: action.newMessage};
            return {...state, messageData: [...state.messageData, newMessageData]};
        default:
            return state
    }
}

//types
export type  dialogsPageType = {
    dialogsData: Array<dialogsDataType>
    messageData: Array<messageDataType>
}
export type messageDataType = {
    id: number
    message: string
}

export type dialogsDataType = {
    id: number
    name: string
}

export type DialogsActionsType = ReturnType<typeof AddDialogMessageAC>

