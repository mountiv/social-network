import s from './Dialogs.module.css'
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";

import React, {ChangeEvent} from "react";
import {DialogsType} from "./DialogsContainer";
import { Navigate } from 'react-router-dom';

/*type DialogsType = {
    dialogsData: Array<{
        id: number
        name: string
    }>
    messageData: Array<{
        id: number
        message: string
    }>
    message: string
    onChangeMessage: (value: string) => void
    addMessage: (value: string) => void
}*/

export const Dialogs = (props: DialogsType) => {
    const MessageValue = React.createRef<HTMLTextAreaElement>()
    const onChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onChangeMessage(e.currentTarget.value)
    }
    const addMessage = () => {
        MessageValue.current && props.addMessage(MessageValue.current.value)
        props.onChangeMessage('')
    }

    let dialogsElement = props.dialogsData
        .map(d => <DialogItem name={d.name} id={d.id}/>)
    let messageElement = props.messageData
        .map(m => <Message message={m.message}/>)

    if(!props.isAuth) <Navigate to={'/login'}/>
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
                />
                <button onClick={addMessage}>Add Post</button>
            </div>
        </div>
    )
}
