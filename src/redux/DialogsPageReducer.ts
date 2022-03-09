import {ActionsType, dialogsPageType} from "./state";

export const AddDialogMessageAC = (newMessage: string) => ({
    type: "ADD-DIALOG-MESSAGE",
    newMessage: newMessage
} as const)

export const ChangeDialogMessageTextAC = (newText: string) => ({
    type: "CHANGE-DIALOG-MESSAGE",
    newText: newText
} as const)

export const DialogsPageReducer = (state: dialogsPageType, action: ActionsType) => {
    switch (action.type) {
        case "CHANGE-DIALOG-MESSAGE":
            state.newMessageText = action.newText
            return state;
        case "ADD-DIALOG-MESSAGE":
            let newMessageData = {id: 6, message: action.newMessage};
            state.messageData.push(newMessageData)
            return state;
        default:
            return state
    }
}

