import s from './Dialogs.module.css'
import {Link} from "react-router-dom";
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import {dialogsPageType} from "../../redux/state";
import React from "react";

type DialogsType = {
    dialogsPage: dialogsPageType
}

export const Dialogs = (props: DialogsType) => {
    const MessageValue = React.createRef<HTMLTextAreaElement>()
    const addMessage = () => {
        alert(MessageValue.current?.value)
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
                <textarea ref={MessageValue}></textarea>
                <button onClick={addMessage}>Add Post</button>
            </div>
        </div>
    )
}