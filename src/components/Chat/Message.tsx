import s from "../Users/User.module.css";
import {Link} from "react-router-dom";
import React from "react";
import {ChatMessageType} from "../../api/chat-api";

export const Message = ({message}: { message: ChatMessageType }) => {

    return <div>
        <div className={s.avaWrapper}>
            <Link to={'/profile/' + message.userId}>
                <img alt={'ava'} src={message.photo}
                     className={s.avatar}/>
            </Link>
        </div>
        <b>{message.userName}</b>
        <a>{message.message}</a>
    </div>
}