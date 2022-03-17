import React from "react";
import {AddDialogMessageAC, ChangeDialogMessageTextAC} from "../../redux/DialogsPageReducer";
import {StoreType} from "../../redux/reduxStore";
import {Dialogs} from "./Dialogs";

type DialogsContainerType = {
    store: StoreType
}

export const DialogsContainer = (props: DialogsContainerType) => {
    const dialogsPage = props.store.getState().dialogsPage
    const dispatch = props.store.dispatch.bind(props.store)
    const message = dialogsPage.newMessageText
    const dialogsData = dialogsPage.dialogsData
    const messageData = dialogsPage.messageData

    const onChangeMessage = (text: string) => {
        dispatch(ChangeDialogMessageTextAC(text))
    }

    const addMessage = (text: string) => {
        dispatch(AddDialogMessageAC(text))
        dispatch(ChangeDialogMessageTextAC(''))
    }

    return (
        <Dialogs dialogsData={dialogsData} messageData={messageData} addMessage={addMessage}
                 onChangeMessage={onChangeMessage} message={message}/>
    )
}
