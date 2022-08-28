import {Link} from "react-router-dom";
import React from "react";
import {ChatMessageAPIType} from "../../../../api/chat-api";
import s from "./Message.module.css"

export const Message = React.memo(({message}: { message: ChatMessageAPIType }) => {

    return <div className={s.message}>
        <div >
            <Link to={'/profile/' + message.userId}>
                <img alt={'ava'} src={message.photo}
                     className={s.ava}/>
            </Link>
        </div>
        <div className={s.text}>
            <div className={s.name}><b>{message.userName}</b></div>
            <p>{message.message}</p>
        </div>
    </div>
})