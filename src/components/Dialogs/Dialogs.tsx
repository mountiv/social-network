import s from './Dialogs.module.css'
import {Link} from "react-router-dom";
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import {
    ActionsType,
    dialogsPageType
} from "../../redux/state";
import React, {ChangeEvent} from "react";
import {AddDialogMessageAC, ChangeDialogMessageTextAC} from "../../redux/DialogsPageReducer";

type DialogsType = {
    dialogsPage: dialogsPageType
    dispatch: (action: ActionsType) => void
    message: string
}

export const Dialogs = (props: DialogsType) => {
    const MessageValue = React.createRef<HTMLTextAreaElement>()
    const onChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(ChangeDialogMessageTextAC(e.currentTarget.value))
    }
    const addMessage = () => {
        MessageValue.current && props.dispatch(AddDialogMessageAC(MessageValue.current.value))
        props.dispatch(ChangeDialogMessageTextAC(''))
    }

    let dialogsElement = props.dialogsPage.dialogsData
        .map(d => <DialogItem name={d.name} id={d.id}/>)
    let messageElement = props.dialogsPage.messageData
        .map(m => <Message message={m.message}/>)
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                {messageElement}
                <textarea
                    ref={MessageValue}
                    value={props.message}
                    onChange={onChangeMessage}
                ></textarea>
                <button onClick={addMessage}>Add Post</button>
            </div>
        </div>
    )
}
